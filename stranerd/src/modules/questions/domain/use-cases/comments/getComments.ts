import { ICommentRepository } from '../../irepositories/icomment'

export class GetQuestionCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string) {
		return await this.repository.get(questionId)
	}
}

export class GetAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string) {
		return await this.repository.get(answerId)
	}
}
