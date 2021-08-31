import { CreateAnswerDownvote, CreateAnswerUpvote, FindAnswerUpvote, GetAnswerUpvotes } from '@modules/questions'
import { QueryParams, Request } from '@utils/commons'

export class AnswerUpvoteController {
	static async FindAnswerUpvote (req: Request) {
		return await FindAnswerUpvote.execute(req.params.id)
	}

	static async GetAnswerUpvotes (req: Request) {
		const query = req.body as QueryParams
		return await GetAnswerUpvotes.execute(query)
	}

	static async UpvoteAnswer (req: Request) {
		return await CreateAnswerUpvote.execute({
			answerId: req.params.id,
			userId: req.authUser!.id
		})
	}

	static async DownvoteAnswer (req: Request) {
		return await CreateAnswerDownvote.execute({
			answerId: req.params.id,
			userId: req.authUser!.id
		})
	}
}