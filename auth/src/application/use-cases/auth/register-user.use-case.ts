import { UseCase } from '../../base'
import { AuthOutput, SocialRegisterInput, UserModel, UserTypes } from '../../domain'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'
import { IAuthRepository } from '../../contracts/repository'

export class RegisterUserUseCase implements UseCase<SocialRegisterInput, AuthOutput> {
	repository

	constructor (repo: IAuthRepository) {
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
			firstName: params.firstName,
			lastName: params.lastName,
			email: params.email,
			photo: params.photo,
			password: params.password,
			isVerified: false,
			authTypes: [params.type],
			roles: userRole,
			signedUpAt: new Date().getTime()
		}

		const TokenPayload = await this.repository.addNewUser(userModel)

		if (TokenPayload) {
			return new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)
		}

		return Promise.reject()
	}

}