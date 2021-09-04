import { SessionMapper } from '../mappers/session'
import { ISessionRepository } from '../../domain/irepositories/session'
import { SessionFromModel, SessionToModel } from '../models/session'
import { Session } from '../mongooseModels/session'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { CancelReason } from '../../domain/types/session'
import { UserBio } from '../../domain/types/common'

export class SessionRepository implements ISessionRepository {
	private static instance: SessionRepository
	private mapper: SessionMapper

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

	async find (id: string) {
		const session = await Session.findById(id)
		return this.mapper.mapFrom(session)
	}

	async accept (id: string, tutorId: string, accepted: boolean) {
		const session = await Session.findOneAndUpdate({
			_id: id,
			tutorId,
			accepted: false
		}, { $set: { accepted: true } })

		return !!session
	}

	async cancel (id: string, reason: CancelReason) {
		const session = await Session.findById(id)
		const reasonData = {
			tutor: false,
			student: false,
			busy: false
		}
		if (reason == 'tutor') reasonData.tutor = true
		if (reason == 'student') reasonData.student = true
		if (reason == 'busy') reasonData.busy = true

		if (session) {
			session.cancelled = reasonData
			session.save()
		}
		return true
	}

	async updateMySessionsBio (userId: string, userBio: UserBio) {
		const result = await Promise.all([
			Session.updateMany({ studentId: userId }, { studentBio: userBio }),
			Session.updateMany({ tutorId: userId }, { tutorBio: userBio })
		])
		return !!result[0].ok && !!result[1].ok
	}
}
