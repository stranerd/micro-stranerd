import { IAnswerUpvoteRepository } from '../../domain/irepositories/answerUpvotes'
import { AnswerUpvoteMapper } from '../mappers'
import { AnswerUpvoteFromModel, AnswerUpvoteToModel } from '../models'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { Answer, AnswerUpvote } from '../mongooseModels'

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
		try {
			let upvote = await AnswerUpvote.findOne({ userId: data.userId, answerId: data.answerId }).session(session)
			if (!upvote || upvote.answerId !== data.answerId) {
				upvote = new AnswerUpvote(data)
				await Answer.findByIdAndUpdate(data.answerId, {
					$inc: {
						[upvote.vote === 1 ? 'votes.upvotes' : 'votes.downvotes']: 1
					}
				}, { session })
			}
			// the vote didnt change
			else if (upvote.vote === data.vote) return this.mapper.mapFrom(upvote)!
			// change answer upvote to downvote
			else if (upvote.vote === 1) await Answer.findByIdAndUpdate(data.answerId, {
				$inc: {
					'votes.upvotes': -1,
					'votes.downvotes': 1
				}
			}, { session })
			// change answer downvote to upvote
			else if (upvote.vote === -1) await Answer.findByIdAndUpdate(data.answerId, {
				$inc: {
					'votes.upvotes': 1,
					'votes.downvotes': -1
				}
			}, { session })
			upvote.vote = data.vote
			await upvote.save({ session })
			await session.commitTransaction()
			session.endSession()
			return this.mapper.mapFrom(upvote)!
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
	}

	async find (id: string) {
		const upvote = await AnswerUpvote.findById(id)
		return this.mapper.mapFrom(upvote)
	}
}
