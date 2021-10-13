import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { SessionFromModel } from '../../../data/models/session'

type Input = { sessionIds: string[], userId: string, reason: keyof SessionFromModel['cancelled'] }

export class CancelSessionUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.cancel(input.sessionIds, input.userId, input.reason)
	}
}
