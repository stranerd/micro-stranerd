import { makeController, Route, StatusCodes } from '@utils/commons'
import { TagController } from '../../controllers/questions'

export const tagsRoutes: Route[] = [
	{
		path: '/tags',
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
		path: '/tags/:id',
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
		path: '/tags/count',
		method: 'put',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await TagController.ModifyTagCounts(req)
				}
			})
		]
	}
]