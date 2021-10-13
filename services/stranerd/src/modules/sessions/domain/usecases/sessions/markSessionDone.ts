import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'

export class MarkSessionDoneUseCase extends BaseUseCase<string, void> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (sessionId: string) {
		return await this.repository.markSessionDone(sessionId)
	}
}