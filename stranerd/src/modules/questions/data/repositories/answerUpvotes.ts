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
		const upvote = await session.withTransaction(async () => {
			let upvote = await AnswerUpvote.findOne({ userId: data.userId, answerId: data.answerId })
			if (!upvote) {
				upvote = new AnswerUpvote(data)
				await Answer.findByIdAndUpdate(data.answerId, {
					$inc: {
						votes: {
							[upvote.vote === 1 ? 'upvotes' : 'downvotes']: 1
						}
					}
				})
			}
			// the vote didnt change
			else if (upvote.vote === data.vote) return upvote
			// change answer upvote to downvote
			else if (upvote.vote === 1) await Answer.findByIdAndUpdate(data.answerId, {
				$inc: {
					votes: {
						upvotes: -1,
						downvotes: 1
					}
				}
			})
			// change answer downvote to upvote
			else if (upvote.vote === -1) await Answer.findByIdAndUpdate(data.answerId, {
				$inc: {
					votes: {
						upvotes: 1,
						downvotes: -1
					}
				}
			})
			upvote.vote = data.vote
			return await upvote.save()
		})
		return this.mapper.mapFrom(upvote)!
	}

	async find (id: string) {
		const upvote = await AnswerUpvote.findById(id)
		return this.mapper.mapFrom(upvote)
	}
}
