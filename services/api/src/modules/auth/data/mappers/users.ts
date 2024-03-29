import { BaseMapper } from '@utils/app/package'
import { AuthUserEntity } from '../../domain/entities/users'
import { UserFromModel, UserToModel } from '../models/users'

export class UserMapper extends BaseMapper<UserFromModel, UserToModel, AuthUserEntity> {
	mapFrom (param: UserFromModel | null) {
		return !param ? null : new AuthUserEntity({
			id: param._id.toString(),
			email: param.email,
			password: param.password,
			roles: param.roles,
			firstName: param.firstName,
			lastName: param.lastName,
			description: param.description,
			photo: param.photo,
			phone: param.phone,
			referrer: param.referrer,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		})
	}

	mapTo (param: AuthUserEntity) {
		return {
			email: param.email,
			password: param.password,
			roles: param.roles,
			firstName: param.firstName,
			lastName: param.lastName,
			description: param.description,
			photo: param.photo,
			phone: param.phone,
			referrer: param.referrer,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}
}