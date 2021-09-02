import { BaseUseCase } from '../../../../../utils/commons'
import { IUserRepository } from '../../i-repositories/users'


type Input = { userId: string | undefined, amount: number}

export class UpdateNerdScoreUseCase implements BaseUseCase<Input, void> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: Input) {
		return await this.repository.updateNerdScore(params.userId, params.amount)
	}
}