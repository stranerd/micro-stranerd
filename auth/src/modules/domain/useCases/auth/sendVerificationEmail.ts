import { BaseUseCase } from '@utils/commons'
import { IAuthRepository } from '../../i-repositories/auth'

export class SendVerificationEmailUseCase implements BaseUseCase<string, boolean> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (email: string) {
		return await this.repository.sendVerificationMail(email)
	}
}