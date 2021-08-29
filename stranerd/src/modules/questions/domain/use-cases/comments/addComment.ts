import { ICommentRepository } from '../../i-repositories/comment'
import { AnswerCommentToModel } from '../../../../../modules/questions/data/models'

export class AddCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (data: AnswerCommentToModel) {
		return await this.repository.add(data)
	}
}
