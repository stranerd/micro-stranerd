import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { SessionEntity } from '../../entities/session'
import { SessionToModel } from '../../../data/models/session'

type Input = {
	sessionId: string
	data: {
		taskId: string | null
		endedAt?: number
	}
}

export class UpdateTaskIdAndEndedAtUseCase extends BaseUseCase<Input, void> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateTaskIdAndEndedAt(input.sessionId, input.data)
	}
}