import { IAnswerCommentRepository } from '../../irepositories/answerComments'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { AnswerCommentEntity } from '../../entities/answerComments'

export class GetAnswerCommentsUseCase extends BaseUseCase<QueryParams, QueryResults<AnswerCommentEntity>> {
	private repository: IAnswerCommentRepository

	constructor (repository: IAnswerCommentRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
