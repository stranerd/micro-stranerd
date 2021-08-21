import { AuthOutput, Credential, SocialRegisterInput, SuccessStatus, Tokens } from '../../application/domain'
import { AuthRepository } from '../../repository'
import {
	AuthenticateUserUseCase,
	LogoutAuthUserUseCase,
	RefreshTokenUseCase,
	RegisterUserUseCase
} from '../../application/use-cases'

export class AuthController {

	async registerUser (user: SocialRegisterInput): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new RegisterUserUseCase(repo)
		const data = await useCase.execute(user)
		return data
	}

	async authenticateUser (details: Credential): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new AuthenticateUserUseCase(repo)
		const data = await useCase.execute(details)
		return data
	}

	async refreshToken (tokens: Tokens): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new RefreshTokenUseCase(repo)
		const data = await useCase.execute(tokens)
		return data
	}

	async logoutUser (userId: string | undefined): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new LogoutAuthUserUseCase(repo)
		const data = await useCase.execute(userId)
		return data
	}

}