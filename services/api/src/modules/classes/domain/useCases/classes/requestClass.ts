import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'

type Input = { classId: string, userId: string, request: boolean }

export class RequestClassUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.requestClass(data.classId, data.userId, data.request)
	}
}
