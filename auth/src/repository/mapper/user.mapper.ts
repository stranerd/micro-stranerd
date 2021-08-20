import { Mapper } from '../../application/base'
import { UserModel } from '../../application/domain'
import { UserEntity } from '../entities/user.entity'

export class UserMapper extends Mapper<UserModel, UserEntity> {
	mapFrom (param: UserModel): UserEntity {
		return {
			_id: null,
			email: param.email,
			password: param.password,
			roles: param.roles,
			name: param.name,
			photoUrl: param.photoUrl,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}

	mapTo (param: UserEntity): UserModel {
		return {
			_id: param._id,
			email: param.email,
			password: param.password,
			roles: param.roles,
			name: param.name,
			photoUrl: param.photoUrl,
			isVerified: param.isVerified,
			authTypes: param.authTypes,
			lastSignedInAt: param.lastSignedInAt,
			signedUpAt: param.signedUpAt
		}
	}
}