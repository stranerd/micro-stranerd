import { BaseUseCase } from '@utils/commons'
import { IGroupRepository } from '../../irepositories/groups'

type Input = { classId: string, admins: string[] }

export class UpdateGroupsAdminsUseCase extends BaseUseCase<Input, boolean> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateGroupsAdmins(input.classId, input.admins)
	}
}
