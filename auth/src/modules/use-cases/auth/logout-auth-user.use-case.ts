import { BaseUseCase } from '@utils/commons'
import { SuccessStatus } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class LogoutAuthUserUseCase implements BaseUseCase<string, SuccessStatus> {
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