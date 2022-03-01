import { DiscussionToModel } from '../../../data/models/discussions'
import { IDiscussionRepository } from '../../irepositories/discussions'
import { BaseUseCase } from '@utils/commons'
import { DiscussionEntity } from '../../entities/discussions'

export class AddDiscussionUseCase extends BaseUseCase<DiscussionToModel, DiscussionEntity> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: DiscussionToModel) {
		return await this.repository.add(data)
	}
}
