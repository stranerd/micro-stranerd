import { IDiscussionRepository } from '../../irepositories/discussions'
import { BaseUseCase } from '@utils/commons'
import { DiscussionEntity } from '../../entities/discussions'

type Input = { id: string, classId: string }

export class FindDiscussionUseCase extends BaseUseCase<Input, DiscussionEntity | null> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.classId, input.id)
	}
}
