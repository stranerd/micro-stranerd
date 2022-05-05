import { ISessionRepository } from '../irepositories/session'
import { SessionFromModel, SessionToModel } from '../../data/models/session'
import { QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '@modules/users'
import { TaskID } from '../types'

export class SessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async add (data: SessionToModel) {
		return await this.repository.add(data)
	}

	async find (input: { sessionId: string, userId: string }) {
		return await this.repository.find(input.sessionId, input.userId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async accept (input: { id: string, tutorId: string, accepted: boolean }) {
		return await this.repository.accept(input.id, input.tutorId, input.accepted)
	}

	async cancel (input: { sessionIds: string[], userId: string, reason: keyof SessionFromModel['cancelled'] }) {
		return await this.repository.cancel(input.sessionIds, input.userId, input.reason)
	}

	async end (input: { sessionIds: string[], studentId: string }) {
		return await this.repository.end(input.sessionIds, input.studentId)
	}

	async markDone (sessionId: string) {
		return await this.repository.markSessionDone(sessionId)
	}

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateSessionsUserBio(input.userId, input.userBio, input.userRoles)
	}

	async updateTaskIdsAndTimes (input: {
		sessionId: string
		data: {
			taskIds: TaskID[]
			startedAt?: number
			delayInMs?: number
		}
	}) {
		return await this.repository.updateTaskIdsAndTimes(input.sessionId, input.data)
	}
}
