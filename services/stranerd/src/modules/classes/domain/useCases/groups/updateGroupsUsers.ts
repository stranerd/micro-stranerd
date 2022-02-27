import { BaseUseCase } from '@utils/commons'
import { IGroupRepository } from '../../irepositories/groups'
import { ClassUsers } from '../../types'

type Input = { classId: string, users: Record<ClassUsers, string[]> }

export class UpdateGroupsUsersUseCase extends BaseUseCase<Input, boolean> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateGroupsUsers(input.classId, input.users)
	}
}
