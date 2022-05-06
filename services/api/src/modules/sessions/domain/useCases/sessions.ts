import { ISessionRepository } from '../irepositories/session'
import { SessionFromModel, SessionToModel } from '../../data/models/session'
import { QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../types'

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
		return await this.repository.markDone(sessionId)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateTaskIdsAndTimes (input: {
		sessionId: string
		data: {
			taskIds: string[]
			startedAt?: number
			delayInMs?: number
		}
	}) {
		return await this.repository.updateTaskIdsAndTimes(input.sessionId, input.data)
	}
}
