import { ICommentRepository } from '../../i-repositories/comment'
import { GetClause } from '@utils/base-types'

export class GetCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (conditions: GetClause) {

		return await this.repository.get(conditions)
	}
}
