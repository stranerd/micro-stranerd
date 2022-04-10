import express from 'express'
import http from 'http'
import io from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
/* import slowDown from 'express-slow-down'
 import rateLimit from 'express-rate-limit'
 import { StatusCodes } from './statusCodes' */
import { Controller } from './controllers'
import { errorHandler, notFoundHandler } from './middlewares'
import path from 'path'
import { SocketCallers, SocketEmitter } from '../sockets'
import { isDev } from '../config'
import { parseAuthUser } from './middlewares/parseAuthUser'
import { getCacheInstance } from '../cache'

type MethodTypes = 'get' | 'post' | 'put' | 'delete' | 'all'
export type Route = {
	path: string
	method: MethodTypes
	controllers: Controller[]
}

const preRoutes: Route[] = []
const postRoutes: Route[] = [
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

export const getNewServerInstance = (routes: Route[], socketCallers: SocketCallers) => {
	const app = express()
	app.disable('x-powered-by')
	const server = http.createServer(app)
	if (isDev) app.use(morgan('dev'))
	app.use(express.json())
	app.use(cors({ origin: '*' }))
	app.use(express.urlencoded({ extended: false }))
	app.use(express.static(path.join(process.cwd(), 'public')))
	/* app.use(rateLimit({
	 windowMs: 30 * 60 * 1000,
	 max: 1000,
	 handler: (_: express.Request, res: express.Response) => res.status(StatusCodes.TooManyRequests).json([{ message: 'Too Many Requests' }])
	 }))
	 app.use(slowDown({
	 windowMs: 10 * 60 * 1000,
	 delayAfter: 500,
	 delayMs: 500
	 })) */
	app.use(
		fileUpload({
			limits: { fileSize: 500 * 1024 * 1024 },
			useTempFiles: false
		})
	)
	const socket = new io.Server(server, { cors: { origin: '*' } })
	const socketEmitter = new SocketEmitter(socket, socketCallers)

	const allRoutes = [...preRoutes, ...routes, ...postRoutes]
	allRoutes.forEach(({ method, path, controllers }) => {
		controllers = [parseAuthUser, ...controllers]
		if (path) app[method]?.(formatPath(path), ...controllers)
		else app.use(...controllers)
	})

	const start = async (port: number) => {
		await getCacheInstance.connect()
		return await new Promise((resolve: (s: boolean) => void, reject: (e: Error) => void) => {
			try {
				server.listen(port, () => resolve(true))
			} catch (err) {
				reject(err as Error)
			}
		})
	}

	return { start, socketEmitter }
}

const formatPath = (path: string) => `/${path}/`
	.replaceAll('///', '/')
	.replaceAll('//', '/')