import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { IEventRepository } from '../../domain/irepositories/events'
import { ClassUsers, EmbeddedUser, EventType } from '../../domain/types'
import { EventMapper } from '../mappers/events'
import { EventFromModel, EventToModel } from '../models/events'
import { Event } from '../mongooseModels/events'

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
		const data = await appInstance.db.parseQueryParams<EventFromModel>(Event, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: EventToModel) {
		const createdAt = Date.now()
		const event = await new Event({
			...data, createdAt, updatedAt: createdAt,
			readAt: { [data.user.id]: createdAt }
		}).save()
		return this.mapper.mapFrom(event)!
	}

	async find (id: string) {
		const event = await Event.findById(id)
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

	async updateUserBio (user: EmbeddedUser) {
		const events = await Event.updateMany({ 'user.id': user.id }, { $set: { user } })
		return events.acknowledged
	}

	async updateUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const events = await Event.updateMany({ classId }, { $set: { users } })
		return events.acknowledged
	}

	async deleteClassEvents (classId: string) {
		const events = await Event.deleteMany({ classId })
		return events.acknowledged
	}

	async updateTaskIds (id: string, data: { taskIds: string[], add: boolean }) {
		const { taskIds, add } = data
		await Event.findByIdAndUpdate(id, {
			[add ? '$addToSet' : '$pull']: { taskIds: { [add ? '$each' : '$in']: taskIds } }
		})
	}

	async markRead (classId: string, userId: string, type: EventType) {
		const readAt = Date.now()
		const events = await Event.updateMany(
			{ classId, [`readAt.${userId}`]: null, 'data.type': type },
			{ $set: { [`readAt.${userId}`]: readAt } }
		)
		return events.acknowledged
	}
}
