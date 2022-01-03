import { ICommentRepository } from '../../irepositories/comments'
import { BaseUseCase } from '@utils/commons'
import { CommentEntity } from '../../entities/comments'

export class FindCommentUseCase extends BaseUseCase<string, CommentEntity | null> {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
