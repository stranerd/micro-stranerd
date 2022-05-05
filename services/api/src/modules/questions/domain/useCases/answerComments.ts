import { IAnswerCommentRepository } from '../irepositories/answerComments'
import { AnswerCommentToModel } from '../../data/models/answerComments'
import { QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../types'

export class AnswerCommentsUseCase {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		this.repository = repository
	}

	async add (data: AnswerCommentToModel) {
		return await this.repository.add(data)
	}

	async deleteAnswerComments (answerId: string) {
		return await this.repository.deleteAnswerComments(answerId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}
}
