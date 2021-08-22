import { UseCase } from '../../base'
import { SocialRegisterInput, TokenInput, UserModel } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'

export class RegisterUserUseCase implements UseCase<SocialRegisterInput, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: SocialRegisterInput): Promise<TokenInput> {

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

		return await this.repository.addNewUser(userModel, params.type)
	}

}