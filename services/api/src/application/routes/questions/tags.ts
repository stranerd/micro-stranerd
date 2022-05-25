import { makeController, Route, StatusCodes } from '@utils/commons'
import { TagController } from '../../controllers/questions/tags'
import { isAdmin } from '@application/middlewares'

export const tagsRoutes: Route[] = [
	{
		path: '/questions/tags',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TagController.GetTags(req)
				}
			})
		]
	},
	{
		path: '/questions/tags/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TagController.FindTag(req)
				}
			})
		]
	},
	{
		path: '/questions/tags/:id',
		method: 'put',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TagController.UpdateTag(req)
				}
			})
		]
	},
	{
		path: '/questions/tags',
		method: 'post',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TagController.CreateTag(req)
				}
			})
		]
	},
	{
		path: '/questions/tags/:id',
		method: 'delete',
		controllers: [
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TagController.DeleteTag(req)
				}
			})
		]
	}
]