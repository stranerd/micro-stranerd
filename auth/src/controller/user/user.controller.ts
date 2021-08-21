import { RoleInput, SuccessStatus, UserModel } from '../../application/domain'
import { UserRepository } from '../../repository'
import { GetUserDetailsUseCase, UpdateUserRoleUseCase } from '../../application/use-cases'

export class UserController {

	async getUserDetails (userId: string): Promise<UserModel> {
		const repo = UserRepository.getInstance()
		const useCase = new GetUserDetailsUseCase(repo)
		const data = await useCase.execute(userId)
		return data
	}

	async updateUserRole (role: RoleInput): Promise<SuccessStatus> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserRoleUseCase(repo)
		const data = await useCase.execute(role)
		return data
	}

}