import { IAnswerUpvoteRepository } from '../../domain/irepositories/answerUpvotes'
import { AnswerUpvoteMapper } from '../mappers'
import { AnswerUpvoteFromModel, AnswerUpvoteToModel } from '../models'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { AnswerUpvote } from '@modules/questions/data/mongooseModels'

export class AnswerUpvoteRepository implements IAnswerUpvoteRepository {
	private static instance: AnswerUpvoteRepository
	private mapper: AnswerUpvoteMapper

	private constructor () {
		this.mapper = new AnswerUpvoteMapper()
	}

	static getInstance () {
		if (!AnswerUpvoteRepository.instance) AnswerUpvoteRepository.instance = new AnswerUpvoteRepository()
		return AnswerUpvoteRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<AnswerUpvoteFromModel>(AnswerUpvote, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: AnswerUpvoteToModel) {
		let upvote = await AnswerUpvote.findOne({ userId: data.userId, answerId: data.answerId })
		if (!upvote) upvote = new AnswerUpvote(data)
		upvote.vote = data.vote
		await upvote.save()
		return this.mapper.mapFrom(upvote)!
	}

	async find (id: string) {
		const upvote = await AnswerUpvote.findById(id)
		return this.mapper.mapFrom(upvote)
	}
}
