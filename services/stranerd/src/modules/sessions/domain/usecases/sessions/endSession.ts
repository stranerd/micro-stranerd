import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'

type Input = { sessionIds: string[], studentId: string }

export class EndSessionUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.end(input.sessionIds, input.studentId)
	}
}
