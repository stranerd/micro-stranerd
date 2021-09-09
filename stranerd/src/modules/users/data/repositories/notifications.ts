import { INotificationRepository } from '../../domain/i-repositories/notifications'
import { NotificationMapper } from '../mappers/notifications'
import { Notification } from '../mongooseModels/notifications'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { NotificationFromModel, NotificationToModel } from '../models/notifications'

export class NotificationRepository implements INotificationRepository {
	private static instance: NotificationRepository
	private mapper = new NotificationMapper()

	static getInstance (): NotificationRepository {
		if (!NotificationRepository.instance) NotificationRepository.instance = new NotificationRepository()
		return NotificationRepository.instance
	}

	async getNotifications (query: QueryParams) {
		const data = await parseQueryParams<NotificationFromModel>(Notification, query)
		return {
			...data,
			results: data.results.map((n) => this.mapper.mapFrom(n)!)
		}
	}

	async findNotification (data: { userId: string, id: string }) {
		const notification = await Notification.findOne({ _id: data.id, userId: data.userId })
		return this.mapper.mapFrom(notification)
	}

	async createNotification (data: NotificationToModel) {
		const notification = await new Notification(data).save()
		return this.mapper.mapFrom(notification)!
	}

	async markNotificationSeen (data: { userId: string, id: string, seen: boolean }) {
		await Notification.findOneAndUpdate({ _id: data.id, userId: data.userId }, { $set: { seen: data.seen } })
	}

	async deleteOldSeenNotifications () {
		const weekInMs = 1000 * 60 * 60 * 24 * 7
		await Notification.deleteMany({
			seen: true,
			createdAt: { $lte: Date.now() - weekInMs }
		})
	}
}