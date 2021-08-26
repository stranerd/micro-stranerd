import { UserBio, UserDates } from '../types/users'
import { BaseEntity } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public bio: UserBio
	public dates: UserDates

	constructor ({ bio, dates }: UserConstructorArgs) {
		super()
		this.bio = bio
		this.dates = dates
	}
}

type UserConstructorArgs = {
	bio: UserBio
	dates: UserDates
}