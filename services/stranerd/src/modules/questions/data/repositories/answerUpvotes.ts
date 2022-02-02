import { IAnswerUpvoteRepository } from '../../domain/irepositories/answerUpvotes'
import { AnswerUpvoteMapper } from '../mappers/answerUpvotes'
import { AnswerUpvoteFromModel, AnswerUpvoteToModel } from '../models/answerUpvotes'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { Answer } from '../mongooseModels/answers'
import { AnswerUpvote } from '../mongooseModels/answerUpvotes'

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
		const session = await mongoose.startSession()
		let res = null as any
		await session.withTransaction(async (session) => {
			let upvote = await AnswerUpvote.findOne({ userId: data.userId, answerId: data.answerId }).session(session)
			if (!upvote) {
				upvote = new AnswerUpvote(data)
				await Answer.findByIdAndUpdate(data.answerId, {
					$addToSet: {
						votes: { userId: data.userId, vote: data.vote }
					}
				}, { session })
			}
			// the vote didnt change
			else if (upvote.vote === data.vote) { /* do nothing */
			}
			// change answer vote
			else await Answer.findOneAndUpdate({
					_id: data.answerId,
					'votes.userId': data.userId
				}, {
					$set: { 'votes.$.vote': data.vote }
				}, { session })

			upvote.vote = data.vote
			await upvote.save({ session })

			res = upvote
			return upvote
		})
		await session.endSession()
		return this.mapper.mapFrom(res)!
	}

	async find (id: string) {
		const upvote = await AnswerUpvote.findById(id)
		return this.mapper.mapFrom(upvote)
	}
}
