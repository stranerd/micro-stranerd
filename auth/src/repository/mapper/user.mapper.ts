import { Mapper } from '../../application/base'
import { UserModel } from '../../application/domain'
import { UserEntity } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'

const saltRounds = 10

const hashPassword = async (password: string | null, saltRounds: number) => {
	if (!password) return null
	return await bcrypt.hash(password, saltRounds)
}

export class UserMapper extends Mapper<UserModel, UserEntity> {
	async mapFrom (param: UserModel): Promise<UserEntity> {
		return {
			_id: param.id,
			email: param.email,
			password: await hashPassword(param.password, saltRounds),
			roles: param.roles,
			firstName: param.firstName,
			lastName: param.lastName,
			photo: param.photo,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}

	async mapTo (param: UserEntity): Promise<UserModel> {
		return {
			id: param._id!,
			email: param.email,
			password: param.password,
			roles: param.roles,
			firstName: param.firstName,
			lastName: param.lastName,
			photo: param.photo,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}
}