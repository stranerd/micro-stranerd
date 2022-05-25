import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { FileController } from '../../controllers/study/files'

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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await FileController.DeleteFile(req)
				}
			})
		]
	}
]