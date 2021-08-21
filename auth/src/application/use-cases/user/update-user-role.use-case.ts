import { UseCase } from '../../base'
import { RoleInput, SuccessStatus } from '../../domain'
import { IUserRepository } from '../../contracts/repository'

export class UpdateUserRoleUseCase implements UseCase<RoleInput, SuccessStatus> {
	repository

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