import { UserBio, UserDates, UserRoles } from '../../domain/types/users'

export interface UserFromModel extends UserToModel {
	_id: string;
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	dates: UserDates
}