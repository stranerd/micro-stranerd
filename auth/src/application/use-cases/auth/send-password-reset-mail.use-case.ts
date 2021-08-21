import { UseCase } from '../../base'
import { SuccessStatus } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class SendPasswordResetMailUseCase implements UseCase<string, SuccessStatus> {
	repository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (email: string ): Promise<SuccessStatus> {

		const sent: boolean = await this.repository.sendPasswordResetMail(email)

		return {
			success: sent
		}

	}

}