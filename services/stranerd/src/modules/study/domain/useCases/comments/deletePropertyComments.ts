import { ICommentRepository } from '../../irepositories/comments'
import { BaseUseCase } from '@utils/commons'
import { CommentToModel } from '@modules/study/data/models/comments'

type Input = { property: keyof Omit<CommentToModel['data'], 'type'>, propertyId: string }

export class DeletePropertyCommentsUseCase extends BaseUseCase<Input, boolean> {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.deletePropertyComments(input.property, input.propertyId)
	}
}
