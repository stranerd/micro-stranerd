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
		let res = null as AnswerUpvoteFromModel | null
		await session.withTransaction(async (session) => {
			let upvote = await AnswerUpvote.findOne({ userId: data.userId, answerId: data.answerId }).session(session)
			if (!upvote || upvote.answerId !== data.answerId) {
				upvote = new AnswerUpvote(data)
				await Answer.findByIdAndUpdate(data.answerId, {
					$push: {
						votes: { userId: data.userId, vote: data.vote }
					}
				}, { session })
			}
			// the vote didnt change
			else if (upvote.vote === data.vote) { /* do nothing */
			}
			// change answer upvote to downvote
			else if (upvote.vote === 1) await Answer.findByIdAndUpdate(data.answerId, {
				$pull: {
					votes: { userId: data.userId, vote: 1 }
				},
				$push: {
					votes: { userId: data.userId, vote: -1 }
				}
			}, { session })
			// change answer downvote to upvote
			else if (upvote.vote === -1) await Answer.findByIdAndUpdate(data.answerId, {
				$pull: {
					votes: { userId: data.userId, vote: -1 }
				},
				$push: {
					votes: { userId: data.userId, vote: 1 }
				}
			}, { session })
			upvote.vote = data.vote
			await upvote.save({ session })

			res = upvote
		})
		return this.mapper.mapFrom(res)!
	}

	async find (id: string) {
		const upvote = await AnswerUpvote.findById(id)
		return this.mapper.mapFrom(upvote)
	}
}
