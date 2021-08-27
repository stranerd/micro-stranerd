import { UserAccount, UserBio, UserDates, UserRoles, UserStatus, UserTutor } from '../types/users'
import { BaseEntity } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public id: string
	public bio: UserBio
	public roles: UserRoles
	public dates: UserDates
	public tutor: UserTutor
	public status: UserStatus
	public account: UserAccount

	constructor ({ id, bio, roles, dates, tutor, status, account }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = bio
		this.roles = roles
		this.dates = dates
		this.tutor = tutor
		this.status = status
		this.account = account
	}
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	tutor: UserTutor
	status: UserStatus
	account: UserAccount
}