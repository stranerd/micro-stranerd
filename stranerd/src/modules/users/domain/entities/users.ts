import { UserAccount, UserBio, UserDates, UserRoles, UserStatus, UserTutor } from '../types/users'
import { BaseEntity } from '@utils/commons'
import { capitalize } from '@utils/commons'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly dates: UserDates
	public readonly tutor: UserTutor
	public readonly status: UserStatus
	public readonly account: UserAccount

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


export const generateDefaultBio = (bio: Partial<UserBio>): UserBio => {
	const first = capitalize(bio?.firstName ?? 'Anon')
	const last = capitalize(bio?.lastName ?? 'Ymous')
	const email = bio?.email ?? 'anon@ymous.com'
	const avatar = bio?.photo ?? null

	return { firstName: first, lastName: last, email, photo: avatar }
}