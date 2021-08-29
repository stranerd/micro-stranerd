import { BaseUseCase } from '@utils/commons'
import { SuccessStatus } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class SendPasswordResetMailUseCase implements BaseUseCase<string, SuccessStatus> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (email: string): Promise<SuccessStatus> {

		const sent: boolean = await this.repository.sendPasswordResetMail(email)

		return {
			success: sent
		}

	}

}