import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'

type Input = { classId: string, adminId: string, userIds: string[], accept: boolean }

export class AddMembersUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.addMembers(data.classId, data.adminId, data.userIds, data.accept)
	}
}
