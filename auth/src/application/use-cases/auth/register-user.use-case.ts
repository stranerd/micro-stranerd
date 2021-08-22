import { UseCase } from '../../base'
import { AuthOutput, SocialRegisterInput, UserModel } from '../../domain'
import { GenerateAuthOutputUseCase } from './generate-auth-output.use-case'
import { IAuthRepository } from '../../contracts/repository'

export class RegisterUserUseCase implements UseCase<SocialRegisterInput, AuthOutput> {
	repository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: SocialRegisterInput): Promise<AuthOutput> {

		const userModel: UserModel = {
			firstName: params.firstName,
			lastName: params.lastName,
			email: params.email,
			photo: params.photo,
			password: params.password,
			isVerified: false,
			authTypes: [params.type],
			roles: {},
			signedUpAt: new Date().getTime(),
			lastSignedInAt: new Date().getTime()
		}

		const TokenPayload = await this.repository.addNewUser(userModel)

		if (TokenPayload) {
			return new GenerateAuthOutputUseCase(this.repository).execute(TokenPayload)
		}

		return Promise.reject()
	}

}