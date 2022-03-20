import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { BaseUseCase } from '@utils/commons'

export class DeleteAnswersCommentsUseCase extends BaseUseCase<string, boolean> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (answerId: string) {
		return await this.repository.deleteAnswerComments(answerId)
	}
}
