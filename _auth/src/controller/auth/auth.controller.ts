import { Credential,SocialRegisterInput,AuthOutput,Tokens, SuccessStatus } from '../../application/domain'
import { Repository } from '../../repository'
import { 
	RegisterUserUseCase,
	AuthenticateUserUseCase,
	RefreshTokenUseCase,
	LogoutAuthUserUseCase
} from '../../application/use-cases'


export class AuthController {

	async registerUser(user: SocialRegisterInput): Promise<AuthOutput> {
		const repo = Repository.getInstance()
		const useCase = new RegisterUserUseCase(repo)
		const data = await useCase.execute(user)
		return data
	}

	async authenticateUser(details: Credential): Promise<AuthOutput> {
		const repo = Repository.getInstance()
		const useCase = new AuthenticateUserUseCase(repo)
		const data = await useCase.execute(details)
		return data
	}

	async refreshToken(tokens: Tokens): Promise<AuthOutput> {
		const repo = Repository.getInstance()
		const useCase = new RefreshTokenUseCase(repo)
		const data = await useCase.execute(tokens)
		return data
	}

	async logoutUser(userId: string | undefined): Promise<SuccessStatus> {
		const repo = Repository.getInstance()
		const useCase = new LogoutAuthUserUseCase(repo)
		const data = await useCase.execute(userId)
		return data
	}


}