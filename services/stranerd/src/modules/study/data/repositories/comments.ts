import { ICommentRepository } from '../../domain/irepositories/comments'
import { CommentMapper } from '../mappers/comments'
import { CommentFromModel, CommentToModel } from '../models/comments'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { Comment } from '../mongooseModels/comments'
import { UserBio } from '../../domain/types'

export class CommentRepository implements ICommentRepository {
	private static instance: CommentRepository
	private mapper: CommentMapper

	private constructor () {
		this.mapper = new CommentMapper()
	}

	static getInstance () {
		if (!CommentRepository.instance) CommentRepository.instance = new CommentRepository()
		return CommentRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<CommentFromModel>(Comment, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: CommentToModel) {
		const comment = await new Comment(data).save()
		return this.mapper.mapFrom(comment)!
	}

	async find (id: string) {
		const comment = await Comment.findById(id)
		return this.mapper.mapFrom(comment)
	}

	async deletePropertyComments (property: keyof Omit<CommentToModel['data'], 'type'>, propertyId: string) {
		const comments = await Comment.deleteMany({ [`data.${property}`]: propertyId })
		return !!comments.acknowledged
	}

	async updateCommentsUserBio (userId: string, userBio: UserBio) {
		const comments = await Comment.updateMany({ userId }, { $set: { userBio } })
		return !!comments.acknowledged
	}
}
