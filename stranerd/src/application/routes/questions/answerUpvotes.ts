import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerUpvoteController } from '../../controllers/questions'

export const answerUpvotesRoutes: Route[] = [
	{
		path: '/answers/upvotes',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerUpvoteController.GetAnswerUpvotes(req)
				}
			})
		]
	},
	{
		path: '/answers/:id/upvote',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerUpvoteController.UpvoteAnswer(req)
				}
			})
		]
	},
	{
		path: '/answers/:id/downvote',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerUpvoteController.DownvoteAnswer(req)
				}
			})
		]
	}
]