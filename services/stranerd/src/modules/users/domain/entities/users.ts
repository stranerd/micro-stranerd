import { UserAccount, UserBio, UserDates, UserRoles, UserSession, UserStatus, UserTutor } from '../types'
import { BaseEntity } from '@utils/commons'
import { getNextRank, getRank } from './ranks'
import { getPercentage } from '@utils/functions'
import { AuthApps } from '@utils/common'

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly dates: UserDates
	public readonly tutor: UserTutor
	public readonly status: UserStatus
	public readonly account: UserAccount
	public readonly session: UserSession

	constructor ({ id, bio, roles, dates, tutor, status, account, session }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = bio ?? {}
		this.roles = roles ?? {}
		this.dates = dates
		this.tutor = tutor
		this.status = status
		this.account = account
		this.session = session
	}

	get rank () {
		return getRank(this.account.score ?? 0)
	}

	get rankProgress () {
		return getPercentage(this.account.score ?? 0, this.rank.score)
	}

	get nextRank () {
		return getNextRank(this.rank.id)
	}

	get isAdmin () {
		const app = AuthApps.Stranerd
		return this.roles[app]?.['isAdmin'] ?? false
	}

	get isTutor () {
		const app = AuthApps.Stranerd
		return this.roles[app]?.['isTutor'] ?? false
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
	session: UserSession
}