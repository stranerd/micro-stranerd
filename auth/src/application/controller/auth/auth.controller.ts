import {
	AuthOutput,
	Credential,
	PasswordResetInput,
	PasswordUpdateInput,
	RegisterInput,
	SuccessStatus,
	Tokens
} from '@modules/domain'
import { AuthRepository, UserRepository } from '@modules/repository'
import {
	AuthenticateUserUseCase,
	GenerateAuthOutputUseCase,
	GoogleSignInUseCase,
	LogoutAuthUserUseCase,
	RefreshTokenUseCase,
	RegisterUserUseCase,
	ResetPasswordUseCase,
	SendPasswordResetMailUseCase,
	SendVerificationEmailUseCase,
	UpdatePasswordUseCase,
	UpdateUserDetailsUseCase,
	VerifyEmailUseCase
} from '@modules/use-cases'
import { AuthTypes } from '@utils/commons'

export class AuthController {
	generateTokenUseCase: GenerateAuthOutputUseCase

	constructor () {
		this.generateTokenUseCase = new GenerateAuthOutputUseCase(UserRepository.getInstance())
	}

	async registerUser (user: RegisterInput): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new RegisterUserUseCase(repo)
		const data = await useCase.execute(user)
		return await this.generateTokenUseCase.execute(data)
	}

	async updateUserDetails (user: RegisterInput): Promise<AuthOutput> {
		const repo = UserRepository.getInstance()
		const useCase = new UpdateUserDetailsUseCase(repo)
		const data = await useCase.execute(user)
		return await this.generateTokenUseCase.execute(data)
	}

	async authenticateUser (details: Credential): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new AuthenticateUserUseCase(repo)
		const data = await useCase.execute(details)
		return await this.generateTokenUseCase.execute(data)
	}

	async refreshToken (tokens: Tokens): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new RefreshTokenUseCase(repo)
		return await useCase.execute(tokens)
	}

	async emailExist (email: string, type: AuthTypes): Promise<boolean> {
		const repo = UserRepository.getInstance()
		return await repo.userWithEmailExist(email, type)
	}

	async logoutUser (userId: string): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new LogoutAuthUserUseCase(repo)
		return await useCase.execute(userId)
	}

	async sendVerificationMail (email: string): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new SendVerificationEmailUseCase(repo)
		return await useCase.execute(email)
	}

	async verifyEmail (email: string): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new VerifyEmailUseCase(repo)
		const data = await useCase.execute(email)
		return await this.generateTokenUseCase.execute(data)
	}

	async sendPasswordResetMail (email: string): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new SendPasswordResetMailUseCase(repo)
		return await useCase.execute(email)
	}

	async resetPassword (input: PasswordResetInput): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new ResetPasswordUseCase(repo)
		const data = await useCase.execute(input)
		return await this.generateTokenUseCase.execute(data)
	}

	async updatePassword (input: PasswordUpdateInput): Promise<SuccessStatus> {
		const repo = AuthRepository.getInstance()
		const useCase = new UpdatePasswordUseCase(repo)
		return await useCase.execute(input)
	}

	async googleSignIn (tokenId: string): Promise<AuthOutput> {
		const repo = AuthRepository.getInstance()
		const useCase = new GoogleSignInUseCase(repo)
		const data = await useCase.execute(tokenId)
		return await this.generateTokenUseCase.execute(data)
	}

}