import { IGroupRepository } from '../../irepositories/groups'
import { BaseUseCase } from '@utils/commons'

type Input = { classId: string, id: string, userId: string }

export class DeleteGroupUseCase extends BaseUseCase<Input, boolean> {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.delete(data.classId, data.id, data.userId)
	}
}
