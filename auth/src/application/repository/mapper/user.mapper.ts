import { BaseMapper } from '@utils/commons'
import { UserEntity } from '../../domain'
import { UserFromModel, UserToModel } from '../models/user'

export class UserMapper extends BaseMapper<UserFromModel, UserToModel, UserEntity> {
	mapFrom (param) {
		return !param ? null : new UserEntity({
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
		})
	}

	mapTo (param) {
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