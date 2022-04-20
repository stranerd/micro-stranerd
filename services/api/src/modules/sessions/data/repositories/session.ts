import { SessionMapper } from '../mappers/session'
import { ISessionRepository } from '../../domain/irepositories/session'
import { SessionFromModel, SessionToModel } from '../models/session'
import { Session } from '../mongooseModels/session'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { TaskID, UserBio, UserRoles } from '../../domain/types'

export class SessionRepository implements ISessionRepository {
	private static instance: SessionRepository
	private mapper = new SessionMapper()

	private constructor () {
		this.mapper = new SessionMapper()
	}

	static getInstance () {
		if (!SessionRepository.instance) SessionRepository.instance = new SessionRepository()
		return SessionRepository.instance
	}

	async add (data: SessionToModel) {
		const session = await new Session(data).save()
		return this.mapper.mapFrom(session)!
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<SessionFromModel>(Session, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async find (id: string, userId: string) {
		const session = await Session.findOne({
			_id: id,
			$or: [{ studentId: userId }, { tutorId: userId }]
		})
		return this.mapper.mapFrom(session)
	}

	async accept (id: string, tutorId: string, accepted: boolean) {
		const session = await Session.findOneAndUpdate({
			_id: id, tutorId, accepted: null
		}, { $set: { accepted } })

		return !!session
	}

	async cancel (ids: string[], userId: string, reason: keyof SessionFromModel['cancelled']) {
		const result = await Session.updateMany({
			_id: { $in: ids }, $or: [{ tutorId: userId }, { studentId: userId }]
		}, { $set: { [`cancelled.${reason}`]: true, done: true } })
		return result.acknowledged
	}

	async end (ids: string[], userId: string) {
		const result = await Session.updateMany({
			_id: { $in: ids }, studentId: userId
		}, { $set: { done: true } })
		return result.acknowledged
	}

	async updateSessionsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const result = await Promise.all([
			Session.updateMany({ studentId: userId }, { $set: { studentBio: userBio, studentRoles: userRoles } }),
			Session.updateMany({ tutorId: userId }, { $set: { tutorBio: userBio, tutorRoles: userRoles } })
		])
		return result[0].acknowledged && result[1].acknowledged
	}

	async updateTaskIdsAndTimes (id: string, data: { taskIds: TaskID[], delayInMs?: number, startedAt?: number }) {
		const { taskIds, startedAt, delayInMs } = data
		await Session.findByIdAndUpdate(id, {
			$set: {
				...(startedAt ? { startedAt: startedAt } : {}),
				...(delayInMs ? { endedAt: Date.now() + delayInMs } : {})
			},
			$addToSet: { taskIds: { $each: taskIds } }
		})
	}

	async markSessionDone (id: string) {
		await Session.findByIdAndUpdate(id, { $set: { done: true, endedAt: Date.now() } })
	}
}
