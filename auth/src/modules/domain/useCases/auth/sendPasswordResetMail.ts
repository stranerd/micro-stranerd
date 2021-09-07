import { BaseUseCase } from '@utils/commons'
import { IAuthRepository } from '../../i-repositories/auth'

export class SendPasswordResetMailUseCase implements BaseUseCase<string, boolean> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (email: string) {
		return await this.repository.sendPasswordResetMail(email)
	}
}