import { AuthOutput, Credential, SocialRegisterInput, SuccessStatus, Tokens, PasswordResetInput, PasswordUpdateInput } from '../../application/domain'
import { AuthRepository, UserRepository } from '../../repository'
import {
	AuthenticateUserUseCase,
	LogoutAuthUserUseCase,
	RefreshTokenUseCase,
	UpdateUserDetailsUseCase,
	RegisterUserUseCase,
	SendPasswordResetMailUseCase,
	SendVerificationEmailUseCase,
	UpdatePasswordUseCase,
	GoogleSignInUseCase,
	ResetPasswordUseCase,
	VerifyEmailUseCase
} from '../../application/use-cases'

export class AuthController {

	async registerUser (user: SocialRegisterInput): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new RegisterUserUseCase(repo)
		const data = await useCase.execute(user)
		return data
	}

	async updateUserDetails (user: SocialRegisterInput): Promise<AuthOutput> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserDetailsUseCase(repo)
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

	async emailExist (email: string,type: string): Promise<boolean> {
		const repo = UserRepository.getInstance()
		const data = await repo.userWithEmailExist(email,type)
		return data
	}

	async logoutUser (userId: string | undefined): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new LogoutAuthUserUseCase(repo)
		const data = await useCase.execute(userId)
		return data
	}

	async sendVerificationMail (email: string ): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new SendVerificationEmailUseCase(repo)
		const data = await useCase.execute(email)
		return data
	}

	async verifyEmail (email: string ): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new VerifyEmailUseCase(repo)
		const data = await useCase.execute(email)
		return data
	}

	async sendPasswordResetMail (email: string ): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new SendPasswordResetMailUseCase(repo)
		const data = await useCase.execute(email)
		return data
	}

	async resetPassword (input: PasswordResetInput ): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new ResetPasswordUseCase(repo)
		const data = await useCase.execute(input)
		return data
	}

	async updatePassword (input: PasswordUpdateInput ): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new UpdatePasswordUseCase(repo)
		const data = await useCase.execute(input)
		return data
	}

	async googleSignIn (tokenId: string ): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new GoogleSignInUseCase(repo)
		const data = await useCase.execute(tokenId)
		return data
	}

}