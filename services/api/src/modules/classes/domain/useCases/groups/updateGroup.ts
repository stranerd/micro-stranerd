import { GroupToModel } from '../../../data/models/groups'
import { IGroupRepository } from '../../irepositories/groups'
import { BaseUseCase } from '@utils/commons'
import { GroupEntity } from '../../entities/groups'

type Input = { classId: string, id: string, userId: string, data: Partial<GroupToModel> }

export class UpdateGroupUseCase extends BaseUseCase<Input, GroupEntity | null> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}
}
