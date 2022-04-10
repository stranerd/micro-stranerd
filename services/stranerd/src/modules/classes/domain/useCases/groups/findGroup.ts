import { IGroupRepository } from '../../irepositories/groups'
import { BaseUseCase } from '@utils/commons'
import { GroupEntity } from '../../entities/groups'

type Input = { classId: string, id: string }

export class FindGroupUseCase extends BaseUseCase<Input, GroupEntity | null> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.classId, input.id)
	}
}
