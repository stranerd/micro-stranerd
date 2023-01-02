import { EmbeddedUser, UserAccount, UserBio, UserDates, UserRoles, UserSchoolData, UserStatus } from '../types'
import { BaseEntity } from '@utils/app/package'
import { getNextRank, getRank } from './ranks'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly dates: UserDates
	public readonly status: UserStatus
	public readonly account: UserAccount
	public readonly school: UserSchoolData | null

	constructor ({ id, bio, roles, dates, status, account, school }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = generateDefaultBio(bio ?? {})
		this.roles = generateDefaultRoles(roles ?? {})
		this.dates = dates
		this.status = status
		this.account = account
		this.school = school
	}

	get rank () {
		return getRank(this.account.score ?? 0)
	}

	get nextRank () {
		return getNextRank(this.rank.id)
	}

	isDeleted () {
		return this.dates.deletedAt !== null
	}

	getEmbedded (): EmbeddedUser {
		return {
			id: this.id,
			bio: this.bio,
			roles: this.roles
		}
	}
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	status: UserStatus
	account: UserAccount
	school: UserSchoolData | null
}

const capitalize = (value: string) => value.trim().split(' ').map((c: string) => (c[0]?.toUpperCase() ?? '') + c.slice(1)).join(' ')

const generateDefaultBio = (bio: Partial<UserBio>): UserBio => {
	const firstName = capitalize(bio?.firstName ?? 'Anon')
	const lastName = capitalize(bio?.lastName ?? 'Ymous')
	const fullName = capitalize(bio?.fullName ?? (firstName + ' ' + lastName))
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const photo = bio?.photo ?? null
	const phone = bio?.phone ?? null
	return { firstName, lastName, fullName, email, description, photo, phone }
}

const generateDefaultRoles = (roles: Partial<UserRoles>): UserRoles => {
	return {
		isStranerdAdmin: roles?.isStranerdAdmin ?? false,
		isStranerdTutor: roles?.isStranerdTutor ?? false
	}
}

export const generateDefaultUser = (user: Partial<EmbeddedUser>): EmbeddedUser => {
	const id = user?.id ?? ''
	const bio = generateDefaultBio(user?.bio ?? {})
	const roles = generateDefaultRoles(user?.roles ?? {})
	return { id, bio, roles }
}