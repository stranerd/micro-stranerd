import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'

type Input = { classId: string, adminId: string, requestId: string, accept: boolean }

export class AcceptRequestUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.acceptRequest(data.classId, data.adminId, data.requestId, data.accept)
	}
}
