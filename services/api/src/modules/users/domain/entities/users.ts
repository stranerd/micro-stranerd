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
		this.bio = bio ?? {}
		this.roles = roles ?? {}
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