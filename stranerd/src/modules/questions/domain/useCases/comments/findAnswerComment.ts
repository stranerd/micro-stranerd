import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { BaseUseCase } from '@utils/commons'
import { AnswerCommentEntity } from '../../entities'

export class FindAnswerCommentUseCase extends BaseUseCase<string, AnswerCommentEntity | null> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
