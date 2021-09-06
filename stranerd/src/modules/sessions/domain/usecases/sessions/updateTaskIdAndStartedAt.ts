import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { TaskID } from '../../types/common'

type Input = {
	sessionId: string
	data: {
		taskId: TaskID
		startedAt?: number
	}
}

export class UpdateTaskIdAndStartedAtUseCase extends BaseUseCase<Input, void> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateTaskIdAndStartedAt(input.sessionId, input.data)
	}
}