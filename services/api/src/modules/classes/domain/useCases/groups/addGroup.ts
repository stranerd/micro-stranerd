import { GroupToModel } from '../../../data/models/groups'
import { IGroupRepository } from '../../irepositories/groups'
import { BaseUseCase } from '@utils/commons'
import { GroupEntity } from '../../entities/groups'

export class AddGroupUseCase extends BaseUseCase<GroupToModel, GroupEntity> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (data: GroupToModel) {
		return await this.repository.add(data)
	}
}
