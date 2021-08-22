import { UseCase } from '../../base'
import { SuccessStatus } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class LogoutAuthUserUseCase implements UseCase<string, SuccessStatus> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (userId: string): Promise<SuccessStatus> {

		const cleared: boolean = await this.repository.clearUserAuthCache(userId)

		return {
			success: cleared
		}

	}

}