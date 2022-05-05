import { IEventRepository } from '../../domain/irepositories/events'
import { EventMapper } from '../mappers/events'
import { EventFromModel, EventToModel } from '../models/events'
import { Event } from '../mongooseModels/events'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../../domain/types'

export class EventRepository implements IEventRepository {
	private static instance: EventRepository
	private mapper: EventMapper

	private constructor () {
		this.mapper = new EventMapper()
	}

	static getInstance () {
		if (!EventRepository.instance) EventRepository.instance = new EventRepository()
		return EventRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<EventFromModel>(Event, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: EventToModel) {
		const event = await new Event(data).save()
		return this.mapper.mapFrom(event)!
	}

	async find (classId: string, id: string) {
		const event = await Event.findOne({ _id: id, classId })
		return this.mapper.mapFrom(event)
	}

	async update (classId: string, id: string, userId: string, data: Partial<EventToModel>) {
		const event = await Event.findOneAndUpdate({
			_id: id,
			'users.admins': userId,
			classId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(event)
	}

	async delete (classId: string, id: string, userId: string) {
		const event = await Event.findOneAndDelete({ _id: id, 'users.admins': userId, classId })
		return !!event
	}

	async updateEventsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const events = await Event.updateMany({ userId }, { $set: { userBio, userRoles } })
		return events.acknowledged
	}

	async updateEventsUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const events = await Event.updateMany({ classId }, { $set: { users } })
		return events.acknowledged
	}

	async deleteClassEvents (classId: string) {
		const events = await Event.deleteMany({ classId })
		return events.acknowledged
	}
}
