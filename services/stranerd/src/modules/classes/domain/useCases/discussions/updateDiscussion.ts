import { DiscussionToModel } from '../../../data/models/discussions'
import { IDiscussionRepository } from '../../irepositories/discussions'
import { BaseUseCase } from '@utils/commons'
import { DiscussionEntity } from '../../entities/discussions'

type Input = { id: string, userId: string, data: DiscussionToModel }

export class UpdateDiscussionUseCase extends BaseUseCase<Input, DiscussionEntity | null> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
