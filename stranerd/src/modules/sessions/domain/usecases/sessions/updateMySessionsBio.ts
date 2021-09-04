import { ISessionRepository } from '../../irepositories/session'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types/common'

type Input = { userId: string, userBio: UserBio }

export class UpdateMySessionsBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateMySessionsBio(input.userId, input.userBio)
	}
}