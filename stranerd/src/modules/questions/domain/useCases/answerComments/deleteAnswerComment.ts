import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { BaseUseCase } from '@utils/commons'

type Input = { answerId: string }

export class DeleteAnswerCommentsUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.deleteAnswerComment(input.answerId)
	}
}
