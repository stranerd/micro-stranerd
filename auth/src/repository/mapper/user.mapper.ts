import { Mapper } from '../../application/base'
import { UserEntity } from '../../application/domain'
import { UserFromModel, UserToModel } from '../models/user'

export class UserMapper extends Mapper<UserFromModel, UserToModel, UserEntity> {
	mapFrom (param: UserFromModel) {
		return {
			id: param._id,
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

	mapTo (param: UserEntity) {
		return {
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