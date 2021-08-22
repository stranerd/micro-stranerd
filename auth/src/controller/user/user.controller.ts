import { RoleInput, SuccessStatus, UserEntity, UserUpdateInput } from '../../application/domain'
import { UserRepository } from '../../repository'
import { GetUserDetailsUseCase, UpdateUserProfileUseCase, UpdateUserRoleUseCase } from '../../application/use-cases'

export class UserController {

	async getUserDetails (userId: string): Promise<UserEntity> {
		const repo = UserRepository.getInstance()
		const useCase = new GetUserDetailsUseCase(repo)
		return await useCase.execute(userId)
	}

	async getUserDetailsWithEmail (email: string): Promise<UserEntity> {
		const repo = UserRepository.getInstance()
		return await repo.userDetails(email, 'email')
	}

	async updateUserRole (role: RoleInput): Promise<SuccessStatus> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserRoleUseCase(repo)
		return await useCase.execute(role)
	}

	async updateUserProfile (role: UserUpdateInput): Promise<SuccessStatus> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserProfileUseCase(repo)
		return await useCase.execute(role)
	}

}