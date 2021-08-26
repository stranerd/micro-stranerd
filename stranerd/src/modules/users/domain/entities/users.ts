import { UserBio, UserDates, UserRoles, UserStatus, UserTutor } from '../types/users'
import { BaseEntity } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public bio: UserBio
	public roles: UserRoles
	public dates: UserDates
	public tutor: UserTutor
	public status: UserStatus

	constructor ({ bio, roles, dates, tutor, status }: UserConstructorArgs) {
		super()
		this.bio = bio
		this.roles = roles
		this.dates = dates
		this.tutor = tutor
		this.status = status
	}
}

type UserConstructorArgs = {
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	tutor: UserTutor
	status: UserStatus
}