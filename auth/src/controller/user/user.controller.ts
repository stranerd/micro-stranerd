import { UserModel, RoleInput, SuccessStatus } from '../../application/domain'
import { Repository } from '../../repository'
import { 
	UpdateUserRoleUseCase,
	GetUserDetailsUseCase
} from '../../application/use-cases'


export class UserController {

	async getUserDetails(userId: string): Promise<UserModel> {
		const repo = Repository.getInstance()
		const useCase = new GetUserDetailsUseCase(repo)
		const data = await useCase.execute(userId)
		return data
	}

	async updateUserRole(role: RoleInput): Promise<SuccessStatus> {
		const repo = Repository.getInstance()
		const useCase = new UpdateUserRoleUseCase(repo)
		const data = await useCase.execute(role)
		return data
	}

}