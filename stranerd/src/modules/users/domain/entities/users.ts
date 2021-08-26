import { UserBio, UserDates, UserRoles } from '../types/users'
import { BaseEntity } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public bio: UserBio
	public roles: UserRoles
	public dates: UserDates

	constructor ({ bio, roles, dates }: UserConstructorArgs) {
		super()
		this.bio = bio
		this.roles = roles
		this.dates = dates
	}
}

type UserConstructorArgs = {
	bio: UserBio
	roles: UserRoles
	dates: UserDates
}