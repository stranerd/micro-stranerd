import { BaseMapper } from '@utils/commons'
import { UserEntity } from '../../domain/entities/users'
import { UserFromModel, UserToModel } from '../models/users'

export class UserMapper extends BaseMapper<UserFromModel, UserToModel, UserEntity> {
	mapFrom (param) {
		return !param ? null : new UserEntity({
			id: param._id,
			bio: param.bio,
			dates: param.dates,
			roles: param.roles
		})
	}

	mapTo (param) {
		return {
			bio: param.bio,
			dates: param.dates,
			roles: param.roles
		}
	}
}