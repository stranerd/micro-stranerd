import { BaseUseCase } from '@utils/commons'
import { IGroupRepository } from '../../irepositories/groups'

export class DeleteClassGroupsUseCase extends BaseUseCase<string, boolean> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (classId: string) {
		return await this.repository.deleteClassGroups(classId)
	}
}
