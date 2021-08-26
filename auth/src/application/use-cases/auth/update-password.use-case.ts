import { BaseUseCase } from '@utils/commons'
import { PasswordUpdateInput, SuccessStatus } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class UpdatePasswordUseCase implements BaseUseCase<PasswordUpdateInput, SuccessStatus> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (input: PasswordUpdateInput): Promise<SuccessStatus> {

		const updated: boolean = await this.repository.updatePassword(input)

		return {
			success: updated
		}

	}

}