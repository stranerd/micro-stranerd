import { UserBio, UserDates } from '../../domain/types/users'

export interface UserFromModel extends UserToModel {
	_id: string;
}

export interface UserToModel {
	bio: UserBio
	dates: UserDates
}