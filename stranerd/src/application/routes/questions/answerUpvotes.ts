import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { AnswerUpvoteController } from '../../controllers/questions'

export const answerUpvotesRoutes: Route[] = [
	{
		path: '/answerUpvotes',
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
		path: '/answerUpvotes/:id',
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
		path: '/answerUpvotes/:id/vote',
		method: 'post',
		controllers: [
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AnswerUpvoteController.VoteAnswer(req)
				}
			})
		]
	}
]