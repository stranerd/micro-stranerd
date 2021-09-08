import { AuthTypes, BaseUseCase } from '@utils/commons'
import { RegisterInput, TokenInput } from '../../types'
import { IAuthRepository } from '../../i-repositories/auth'
import { UserToModel } from '../../../data/models/users'

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
			referrer: params.referrer,
			isVerified: false,
			authTypes: [AuthTypes.email]
		}

		return await this.repository.addNewUser(userModel, AuthTypes.email)
	}
}