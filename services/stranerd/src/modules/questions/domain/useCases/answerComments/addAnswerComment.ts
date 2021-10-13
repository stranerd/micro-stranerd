import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { AnswerCommentToModel } from '../../../data/models/answerComments'
import { BaseUseCase } from '@utils/commons'
import { AnswerCommentEntity } from '../../entities/answerComments'

export class AddAnswerCommentUseCase extends BaseUseCase<AnswerCommentToModel, AnswerCommentEntity> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (data: AnswerCommentToModel) {
		return await this.repository.add(data)
	}
}
