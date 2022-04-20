import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, tutorId: string, accepted: boolean }

export class AcceptSessionUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.accept(input.id, input.tutorId, input.accepted)
	}
}
