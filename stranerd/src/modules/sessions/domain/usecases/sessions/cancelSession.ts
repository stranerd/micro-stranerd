import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { CancleReason } from '../../types/session'


type Input = { id: string, reason: CancleReason }

export class CancelSessionUseCase extends BaseUseCase<Input, boolean>  {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.cancel(input.id,input.reason)
	}
}
