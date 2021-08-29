import { BaseUseCase } from '@utils/commons'
import { RoleInput, SuccessStatus } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class UpdateUserRoleUseCase implements BaseUseCase<RoleInput, SuccessStatus> {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (roleInput: RoleInput): Promise<SuccessStatus> {

		const updated = await this.repository.updateUserRole(roleInput)

		return {
			success: updated
		}

	}

}