import { QueryParams } from '@utils/commons'
import { ICommentRepository } from '../i-repositories/comments'
import { CommentToModel } from '../../data/models/comments'
import { CommentMetaType } from '../types'

export class CommentsUseCase {
	repository: ICommentRepository

	constructor (repo: ICommentRepository) {
		this.repository = repo
	}

	async get (input: QueryParams) {
		return await this.repository.get(input)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async create (data: CommentToModel) {
		return await this.repository.add(data)
	}

	async update (input: { id: string, userId: string, data: Partial<CommentToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async delete (input: { id: string, userId: string }) {
		return await this.repository.delete(input.id, input.userId)
	}

	async deleteEntityComments (entity: CommentToModel['entity']) {
		return await this.repository.deleteEntityComments(entity)
	}

	async updateCommentMeta (data: { id: string, property: CommentMetaType, value: 1 | -1 }) {
		return this.repository.updateCommentMeta(data.id, data.property, data.value)
	}

	async updateUserBio (user: CommentToModel['user']) {
		return await this.repository.updateUserBio(user)
	}
}