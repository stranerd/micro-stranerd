import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { AnswerCommentToModel } from '../../../data/models'
import { BaseUseCase } from '@utils/commons'
import { AnswerCommentEntity } from '../../entities'

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
