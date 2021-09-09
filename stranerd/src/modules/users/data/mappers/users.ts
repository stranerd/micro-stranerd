import { BaseMapper } from '@utils/commons'
import { UserEntity } from '../../domain/entities/users'
import { UserFromModel, UserToModel } from '../models/users'

export class UserMapper extends BaseMapper<UserFromModel, UserToModel, UserEntity> {
	mapFrom (param: UserFromModel | null) {
		return !param ? null : new UserEntity({
			id: param._id.toString(),
			bio: param.bio,
			dates: param.dates,
			roles: param.roles,
			tutor: param.tutor,
			status: param.status,
			account: param.account,
			session: param.session
		})
	}

	mapTo (param: UserEntity) {
		return {
			bio: param.bio,
			dates: param.dates,
			roles: param.roles,
			tutor: param.tutor,
			status: param.status,
			account: param.account,
			session: param.session
		}
	}
}