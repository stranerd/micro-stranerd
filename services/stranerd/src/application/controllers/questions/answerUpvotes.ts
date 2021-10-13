import { CreateAnswerUpvote, FindAnswerUpvote, GetAnswerUpvotes } from '@modules/questions'
import { QueryParams, Request } from '@utils/commons'

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
		return await CreateAnswerUpvote.execute({
			answerId: req.params.id,
			userId: req.authUser!.id,
			vote: vote ? 1 : -1
		})
	}
}