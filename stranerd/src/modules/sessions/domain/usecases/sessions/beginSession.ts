import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, accepted: boolean }

export class BeginSessionUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.accept(input.id, input.accepted)
	}
}
