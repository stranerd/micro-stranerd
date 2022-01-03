import { ICommentRepository } from '../../irepositories/comments'
import { CommentToModel } from '../../../data/models/comments'
import { BaseUseCase } from '@utils/commons'
import { CommentEntity } from '../../entities/comments'

export class AddCommentUseCase extends BaseUseCase<CommentToModel, CommentEntity> {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		super()
		this.repository = repository
	}

	async execute (data: CommentToModel) {
		return await this.repository.add(data)
	}
}
