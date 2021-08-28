import { ICommentRepository } from '../../irepositories/icomment'
import { CommentEntity } from '../../entities/comment'

export class ListenToQuestionCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string, callback: (entities: CommentEntity[]) => void) {
		return await this.repository.listen(questionId, callback)
	}
}

export class ListenToAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, callback: (entities: CommentEntity[]) => void) {
		return await this.repository.listen(answerId, callback)
	}
}
