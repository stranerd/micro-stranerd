import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import http from 'http'
import morgan from 'morgan'
import path from 'path'
import io from 'socket.io'
import { addWaitBeforeExit } from '../exit'
import { Instance } from '../instance'
import { SocketEmitter } from '../sockets'
import { Controller, makeController } from './controllers'
import { errorHandler, notFoundHandler } from './middlewares'
import { parseAuthUser } from './middlewares/parseAuthUser'
import { StatusCodes } from './statusCodes'

type MethodTypes = 'get' | 'post' | 'put' | 'delete' | 'all'
export type Route = {
	path: string
	method: MethodTypes
	controllers: Controller[]
}

const preRoutes: Route[] = []
const postRoutes: Route[] = [
	{
		path: '__health',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: `${Instance.get().settings.appId} service running`
				}
			})
		]
	},
	{
		path: '',
		method: 'all',
		controllers: [notFoundHandler]
	},
	{
		path: '',
		method: 'all',
		controllers: [errorHandler]
	}
]

export class Server {
	#expressApp: express.Express
	#httpServer: http.Server<any, any>
	#socketEmitter: SocketEmitter

	constructor () {
		const settings = Instance.get().settings
		this.#expressApp = express()
		this.#expressApp.disable('x-powered-by')
		this.#httpServer = http.createServer(this.#expressApp)
		if (settings.isDev) this.#expressApp.use(morgan('dev'))
		this.#expressApp.use(express.json())
		this.#expressApp.use(cors({ origin: '*' }))
		this.#expressApp.use(express.urlencoded({ extended: false }))
		this.#expressApp.use(express.static(path.join(process.cwd(), 'public')))
		if (settings.useRateLimit) this.#expressApp.use(rateLimit({
			windowMs: settings.rateLimitPeriodInMs,
			max: settings.rateLimit,
			handler: (_: express.Request, res: express.Response) => res.status(StatusCodes.TooManyRequests).json([{ message: 'Too Many Requests' }])
		}))
		if (settings.useSlowDown) this.#expressApp.use(slowDown({
			windowMs: settings.slowDownPeriodInMs,
			delayAfter: settings.slowDownAfter,
			delayMs: settings.slowDownDelayInMs
		}))
		this.#expressApp.use(
			fileUpload({
				limits: { fileSize: settings.maxFileUploadSizeInMb * 1024 * 1024 },
				useTempFiles: false
			}) as any
		)
		const socket = new io.Server(this.#httpServer, { cors: { origin: '*' } })
		this.#socketEmitter = new SocketEmitter(socket, {
			onConnect: async () => {},
			onDisconnect: async () => {}
		})
	}

	get socketEmitter() {
		return this.#socketEmitter
	}

	set routes(routes: Route[]) {
		const allRoutes = [...preRoutes, ...routes, ...postRoutes]
		allRoutes.forEach(({ method, path, controllers }) => {
			controllers = [parseAuthUser, ...controllers]
			if (path) this.#expressApp[method]?.(formatPath(path), ...controllers)
			else this.#expressApp.use(...controllers)
		})
	}

	async start  (port: number) {
		return await new Promise((resolve: (s: boolean) => void, reject: (e: Error) => void) => {
			try {
				const app = this.#httpServer.listen(port, () => resolve(true))
				addWaitBeforeExit(app.close)
			} catch (err) {
				reject(err as Error)
			}
		})
	}
}

const formatPath = (path: string) => `/${path}/`
	.replaceAll('///', '/')
	.replaceAll('//', '/')