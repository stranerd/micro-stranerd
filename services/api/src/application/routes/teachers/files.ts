import { makeController, Route, StatusCodes } from '@utils/app/package'
import { FileController } from '../../controllers/teachers/files'
import { isAuthenticated } from '@application/middlewares'

export const filesRoutes: Route[] = [
	{
		path: '/teachers/files/:courseId',
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
		path: '/teachers/files/:courseId/:id',
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
		path: '/teachers/files/:courseId/:id',
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
		path: '/teachers/files/:courseId',
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
		path: '/teachers/files/:courseId/:id',
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