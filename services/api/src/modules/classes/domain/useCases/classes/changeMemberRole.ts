import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'
import { ClassUsers } from '../../types'

type Input = { classId: string, adminId: string, userId: string, role: ClassUsers, add: boolean }

export class ChangeMemberRoleUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.changeMemberRole(data.classId, data.adminId, data.userId, data.role, data.add)
	}
}
