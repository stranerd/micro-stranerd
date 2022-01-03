import { ICommentRepository } from '../../irepositories/comments'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { CommentEntity } from '../../entities/comments'

export class GetCommentsUseCase extends BaseUseCase<QueryParams, QueryResults<CommentEntity>> {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
