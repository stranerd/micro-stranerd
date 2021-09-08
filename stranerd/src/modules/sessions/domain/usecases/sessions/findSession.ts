import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { SessionEntity } from '../../entities/session'

type Input = { sessionId: string, userId: string }

export class FindSessionUseCase extends BaseUseCase<Input, SessionEntity | null> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.sessionId, input.userId)
	}
}