import { UseCase } from '../../base'
import { SuccessStatus } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class SendVerificationEmailUseCase implements UseCase<string, SuccessStatus> {
	repository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (email: string ): Promise<SuccessStatus> {

		const sent: boolean = await this.repository.sendVerificationMail(email)

		return {
			success: sent
		}

	}

}