import { makeController, Route, StatusCodes } from '@utils/app/package'
import { FileController } from '../../controllers/study/files'
import { isAuthenticated } from '@application/middlewares'

export const filesRoutes: Route[] = [
	{
		path: '/study/files',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FileController.GetFile(req)
				}
			})
		]
	},
	{
		path: '/study/files/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FileController.FindFile(req)
				}
			})
		]
	},
	{
		path: '/study/files/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FileController.UpdateFile(req)
				}
			})
		]
	},
	{
		path: '/study/files',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FileController.CreateFile(req)
				}
			})
		]
	},
	{
		path: '/study/files/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FileController.DeleteFile(req)
				}
			})
		]
	}
]