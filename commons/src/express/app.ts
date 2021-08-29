import express from 'express'
import http from 'http'
import io from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import { Controller } from './controllers'
import { errorHandler, notFoundHandler } from './middlewares'
import { isDev } from '../config'
import path from 'path'
import { setupSocketConnection, SocketParams } from './sockets'

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

export const getNewServerInstance = (routes: Route[], socketChannels: SocketParams) => {
	const app = express()
	const server = http.createServer(app)
	const socket = new io.Server(server)
	if (isDev) app.use(morgan('dev'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(express.static(path.join(process.cwd(), 'public')))
	app.use(cors())
	app.use(
		fileUpload({
			limits: { fileSize: 100 * 1024 * 1024 },
			useTempFiles: false
		})
	)

	const allRoutes = [...preRoutes, ...routes, ...postRoutes]
	allRoutes.forEach(({ method, path, controllers }) => {
		if (path) app[method]?.(formatPath(path), ...controllers)
		else app.use(...controllers)
	})

	const start = async (port: number) => {
		return await new Promise((resolve: (s: boolean) => void, reject: (e: Error) => void) => {
			try {
				app.listen(port, () => {
					setupSocketConnection(socket, socketChannels)
					resolve(true)
				})
			} catch (err) {
				reject(err)
			}
		})
	}

	return { start, socket, app }
}

const formatPath = (path: string) => `/${ path }/`
	.replaceAll('///', '/')
	.replaceAll('//', '/')