import { UseCase } from '../../base'
import { AuthOutput, SocialRegisterInput, UserModel, UserTypes } from '../../domain'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'
import { IUserRepository } from '../../contracts/repository'

export class RegisterUserUseCase implements UseCase<SocialRegisterInput, AuthOutput> {
	repository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async execute (params: SocialRegisterInput): Promise<AuthOutput> {

		const userRole: UserTypes = {
			stranerd: {
				isAdmin: false,
				isModerator: false
			},
			brainBox: {
				isAdmin: false,
				isModerator: false
			},
			tutorStack: {
				isAdmin: false,
				isModerator: false
			}
		}

		const userModel: UserModel = {
			name: params.name,
			email: params.email,
			photoUrl: params.photoUrl,
			password: params.password,
			isVerified: false,
			authTypes: [params.type],
			roles: userRole,
			signedUpAt: new Date().getTime()
		}

		const TokenPayload = await this.repository.addNewUser(userModel)

		if (TokenPayload) {

			const response = new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)

			return new Promise((resolve) => resolve(response))
		}

		return new Promise((resolve, reject) => reject())
	}

}