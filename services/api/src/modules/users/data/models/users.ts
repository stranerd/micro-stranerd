import { UserAccount, UserBio, UserDates, UserRoles, UserSchoolData, UserSession, UserStatus } from '../../domain/types'

export interface UserFromModel extends UserToModel {
	_id: string;
}

export interface UserToModel {
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	status: UserStatus
	account: UserAccount
	session: UserSession
	school: UserSchoolData | null
}
