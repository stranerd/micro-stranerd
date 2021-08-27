import { UserAccount, UserBio, UserDates, UserRoles, UserStatus, UserTutor } from '../../domain/types/users'

export interface UserFromModel extends UserToModel {
	_id: string;
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	tutor: UserTutor
	status: UserStatus
	account: UserAccount
}