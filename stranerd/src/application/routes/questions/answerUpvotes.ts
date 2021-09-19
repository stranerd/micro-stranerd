import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerUpvoteController } from '../../controllers/questions'

export const answerUpvotesRoutes: Route[] = [
	{
		path: '/answersUpvotes',
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
		path: '/answersUpvotes/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerUpvoteController.FindAnswerUpvote(req)
				}
			})
		]
	},
	{
		path: '/answersUpvotes/:id/upvote',
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
		path: '/answersUpvotes/:id/downvote',
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