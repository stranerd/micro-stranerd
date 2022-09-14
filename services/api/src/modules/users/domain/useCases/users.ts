import { IUserRepository } from '../irepositories/users'
import { UserAccount, UserBio, UserMeta, UserRoles, UserSchoolData } from '../types'
import { QueryParams } from '@utils/app/package'

export class UsersUseCase {
	repository: IUserRepository

	constructor (repo: IUserRepository) {
		this.repository = repo
	}

	async createWithBio (params: { id: string, data: UserBio, timestamp: number }) {
		return await this.repository.createUserWithBio(params.id, params.data, params.timestamp)
	}

	async updateWithBio (params: { id: string, data: UserBio, timestamp: number }) {
		return await this.repository.updateUserWithBio(params.id, params.data, params.timestamp)
	}

	async updateRoles (params: { id: string, data: UserRoles, timestamp: number }) {
		return await this.repository.updateUserWithRoles(params.id, params.data, params.timestamp)
	}

	async markDeleted (params: { id: string, timestamp: number }) {
		return await this.repository.markUserAsDeleted(params.id, params.timestamp)
	}

	async find (id: string) {
		return await this.repository.findUser(id)
	}

	async get (query: QueryParams) {
		return await this.repository.getUsers(query)
	}

	async incrementMeta (params: { id: string, value: 1 | -1, property: keyof Omit<UserAccount['meta'], 'tutorSessions' | 'sessions'> }) {
		return await this.repository.incrementUserMetaProperty(params.id, params.property, params.value)
	}

	async incrementSessionCount (params: { studentId: string, tutorId: string, value: 1 | -1 }) {
		await Promise.all([
			this.repository.incrementUserMetaProperty(params.studentId, UserMeta.sessions, params.value),
			this.repository.incrementUserMetaProperty(params.tutorId, UserMeta.tutorSessions, params.value)
		])
	}

	async updateStatus (input: { userId: string, socketId: string, add: boolean }) {
		return await this.repository.updateUserStatus(input.userId, input.socketId, input.add)
	}

	async resetAllUsersStatus () {
		return await this.repository.resetAllUsersStatus()
	}

	async resetRankings (key: keyof UserAccount['rankings']) {
		return await this.repository.resetRankings(key)
	}

	async updateRatings (input: { userId: string, ratings: number, add: boolean }) {
		return await this.repository.updateUserRatings(input.userId, input.ratings, input.add)
	}

	async setCurrentSession (params: { studentId: string, tutorId: string, sessionId: string, add: boolean }) {
		return await this.repository.setUsersCurrentSession(params.studentId, params.tutorId, params.sessionId, params.add)
	}

	async updateQueuedSessions (params: { studentId: string, sessionIds: string[], tutorId: string, add: boolean }) {
		return await this.repository.updateUserQueuedSessions(params.studentId, params.tutorId, params.sessionIds, params.add)
	}

	async updateNerdScore (params: { userId: string, amount: number }) {
		return await this.repository.updateNerdScore(params.userId, params.amount)
	}

	async updateSchool (params: { userId: string, data: UserSchoolData }) {
		return await this.repository.updateUserSchoolData(params.userId, params.data)
	}

	async updateStreak (id: string) {
		return await this.repository.updateUserStreak(id)
	}
}