import express from 'express'
import { Controller } from './controllers'
import { errorHandler, notFoundHandler } from './middlewares'

type MethodTypes = 'get' | 'post' | 'put' | 'delete' | 'all' | 'use'
export type Route = {
	path: string
	method: MethodTypes
	controllers: Controller[]
}


const defaultRoutes: Route[] = [
	{
		path: '*',
		method: 'all',
		controllers: [notFoundHandler]
	},
	{
		path: '',
		method: 'use',
		controllers: [errorHandler]
	}
]

export const getNewExpressInstance = (routes: Route[]) => {
	const app = express()

	const router = express.Router()
	const allRoutes = [...routes, ...defaultRoutes]
	allRoutes.forEach(({ method, path, controllers }) => {
		if (path) router[method]?.(path, ...controllers)
		else router.use(...controllers)
	})
	app.use(router)

	const startServer = async (port: number) => {
		app.listen(port, () => {
			console.log(`Example app listening at port ${port}`)
		})
	}

	return { startServer }
}