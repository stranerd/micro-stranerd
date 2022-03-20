import { UserAccount, UserBio, UserDates, UserRoles, UserSchoolData, UserSession, UserStatus } from '../types'
import { AuthApps, BaseEntity } from '@utils/commons'
import { getNextRank, getRank } from './ranks'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly dates: UserDates
	public readonly status: UserStatus
	public readonly account: UserAccount
	public readonly session: UserSession
	public readonly school: UserSchoolData | null

	constructor ({ id, bio, roles, dates, status, account, session, school }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = bio ?? {}
		this.roles = roles ?? {}
		this.dates = dates
		this.status = status
		this.account = account
		this.session = session
		this.school = school
	}

	get rank () {
		return getRank(this.account.score ?? 0)
	}

	get nextRank () {
		return getNextRank(this.rank.id)
	}

	isAdmin () {
		const app = AuthApps.Stranerd
		return this.roles[app]?.['isAdmin'] ?? false
	}

	isTutor () {
		const app = AuthApps.Stranerd
		return this.roles[app]?.['isTutor'] ?? false
	}
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	dates: UserDates
	status: UserStatus
	account: UserAccount
	session: UserSession
	school: UserSchoolData | null
}