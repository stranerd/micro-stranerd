import express from 'express'
import { Controller } from './controllers'
import { errorHandler, notFoundHandler } from './middlewares'

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

export const getNewServerInstance = (routes: Route[]) => {
	const app = express()
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))

	const allRoutes = [...preRoutes, ...routes, ...postRoutes]
	allRoutes.forEach(({ method, path, controllers }) => {
		if (path) app[method]?.(formatPath(path), ...controllers)
		else app.use(...controllers)
	})

	const start = async (port: number) => {
		return await new Promise((resolve: (s: boolean) => void, reject: (e: Error) => void) => {
			try {
				app.listen(port, () => resolve(true))
			} catch (err) {
				reject(err)
			}
		})
	}

	return { start }
}

const formatPath = (path: string) => `/${ path }/`
	.replaceAll('///', '/')
	.replaceAll('//', '/')