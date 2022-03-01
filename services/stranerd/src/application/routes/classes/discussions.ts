import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { DiscussionController } from '../../controllers/classes/discussions'

export const discussionRoutes: Route[] = [
	{
		path: '/classes/discussions',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DiscussionController.GetDiscussions(req)
				}
			})
		]
	},
	{
		path: '/classes/discussions/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DiscussionController.FindDiscussion(req)
				}
			})
		]
	},
	{
		path: '/classes/discussions',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DiscussionController.CreateDiscussion(req)
				}
			})
		]
	}
]