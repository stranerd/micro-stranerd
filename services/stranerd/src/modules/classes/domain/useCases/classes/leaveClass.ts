import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'

type Input = { classId: string, userId: string }

export class LeaveClassUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.leaveClass(data.classId, data.userId)
	}
}
