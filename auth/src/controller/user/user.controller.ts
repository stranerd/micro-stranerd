import { RoleInput, SuccessStatus, UserModel, UserUpdateInput } from '../../application/domain'
import { UserRepository } from '../../repository'
import { GetUserDetailsUseCase, UpdateUserRoleUseCase, UpdateUserProfileUseCase } from '../../application/use-cases'

export class UserController {

	async getUserDetails (userId: string): Promise<UserModel> {
		const repo = UserRepository.getInstance()
		const useCase = new GetUserDetailsUseCase(repo)
		const data = await useCase.execute(userId)
		return data
	}

	async getUserDetailsWithEmail (email: string): Promise<UserModel> {
		const repo = UserRepository.getInstance()
		const data = await repo.userDetails(email,'email')
		return data
	}

	async updateUserRole (role: RoleInput): Promise<SuccessStatus> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserRoleUseCase(repo)
		const data = await useCase.execute(role)
		return data
	}


	async updateUserProfile (role: UserUpdateInput): Promise<SuccessStatus> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserProfileUseCase(repo)
		const data = await useCase.execute(role)
		return data
	}


}