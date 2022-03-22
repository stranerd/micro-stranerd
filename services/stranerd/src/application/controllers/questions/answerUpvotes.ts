import { CreateAnswerUpvote, FindAnswer, FindAnswerUpvote, GetAnswerUpvotes } from '@modules/questions'
import { BadRequestError, QueryParams, Request } from '@utils/commons'

export class AnswerUpvoteController {
	static async FindAnswerUpvote (req: Request) {
		return await FindAnswerUpvote.execute(req.params.id)
	}

	static async GetAnswerUpvotes (req: Request) {
		const query = req.query as QueryParams
		return await GetAnswerUpvotes.execute(query)
	}

	static async VoteAnswer (req: Request) {
		const vote = !!req.body.vote
		const answer = await FindAnswer.execute(req.params.answerId)
		if (!answer) throw new BadRequestError('answer not found')
		return await CreateAnswerUpvote.execute({
			answerId: req.params.answerId,
			userId: req.authUser!.id,
			vote: vote ? 1 : -1
		})
	}
}