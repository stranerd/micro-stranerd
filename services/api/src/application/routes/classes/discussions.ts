import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { DiscussionController } from '../../controllers/classes/discussions'

export const discussionRoutes: Route[] = [
	{
		path: '/classes/discussions/:classId',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DiscussionController.GetDiscussions(req)
				}
			})
		]
	},
	{
		path: '/classes/discussions/:classId/:id',
		method: 'get',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DiscussionController.FindDiscussion(req)
				}
			})
		]
	},
	{
		path: '/classes/discussions/:classId',
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
	},
	{
		path: '/classes/discussions/:classId/:groupId/read',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await DiscussionController.MarkRead(req)
				}
			})
		]
	}
]