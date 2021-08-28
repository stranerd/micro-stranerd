import { ICommentRepository } from '../../i-repositories/comment'
import { CommentToModel } from '../../../../../modules/questions/data/models'


export class AddCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (data: CommentToModel) {
		return await this.repository.add(data)
	}
}
