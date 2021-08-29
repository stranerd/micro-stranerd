import { AuthTypes, BaseUseCase } from '@utils/commons'
import { RegisterInput, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'
import { UserToModel } from '../../repository/models'

export class RegisterUserUseCase implements BaseUseCase<RegisterInput, TokenInput> {
	repository: IAuthRepository

	constructor (repo: IAuthRepository) {
		this.repository = repo
	}

	async execute (params: RegisterInput): Promise<TokenInput> {

		const userModel: UserToModel = {
			firstName: params.firstName,
			lastName: params.lastName,
			password: params.password,
			email: params.email,
			photo: params.photo,
			isVerified: false,
			authTypes: [AuthTypes.email],
			roles: {},
			signedUpAt: Date.now(),
			lastSignedInAt: Date.now()
		}

		return await this.repository.addNewUser(userModel, AuthTypes.email)
	}

}