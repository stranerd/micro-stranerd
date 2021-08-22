import { UseCase } from '../../base'
import { RegisterInput, TokenInput } from '../../domain'
import { IAuthRepository } from '../../contracts/repository'
import { UserToModel } from '../../../repository/models'
import { AuthTypes } from '@utils/commons'

export class RegisterUserUseCase implements UseCase<RegisterInput, TokenInput> {
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
			signedUpAt: new Date().getTime(),
			lastSignedInAt: new Date().getTime()
		}

		return await this.repository.addNewUser(userModel, AuthTypes.email)
	}

}