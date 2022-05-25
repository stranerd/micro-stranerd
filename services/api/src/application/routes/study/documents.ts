import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { DocumentController } from '../../controllers/study/documents'

export const documentsRoutes: Route[] = [
	{
		path: '/study/documents',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DocumentController.GetDocument(req)
				}
			})
		]
	},
	{
		path: '/study/documents/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DocumentController.FindDocument(req)
				}
			})
		]
	},
	{
		path: '/study/documents/:id',
		method: 'put',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DocumentController.UpdateDocument(req)
				}
			})
		]
	},
	{
		path: '/study/documents',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DocumentController.CreateDocument(req)
				}
			})
		]
	},
	{
		path: '/study/documents/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DocumentController.DeleteDocument(req)
				}
			})
		]
	}
]