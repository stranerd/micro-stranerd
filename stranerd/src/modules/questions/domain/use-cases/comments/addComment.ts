import { ICommentRepository } from '../../irepositories/icomment'
import { CommentFactory } from '../../factories/comment'

export class AddQuestionCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string, factory: CommentFactory) {
		return await this.repository.add(questionId, await factory.toModel())
	}
}

export class AddAnswerCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, factory: CommentFactory) {
		return await this.repository.add(answerId, await factory.toModel())
	}
}
