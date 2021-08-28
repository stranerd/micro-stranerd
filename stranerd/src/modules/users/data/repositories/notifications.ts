import { INotificationRepository } from '../../domain/i-repositories/notifications'
import { NotificationMapper } from '../mappers/notifications'
import { Notification } from '../mongooseModels/notifications'
import { mongoose } from '@utils/commons'

export class NotificationRepository implements INotificationRepository {
	private static instance: NotificationRepository
	private mapper = new NotificationMapper()

	static getInstance (): NotificationRepository {
		if (!NotificationRepository.instance) NotificationRepository.instance = new NotificationRepository()
		return NotificationRepository.instance
	}

	async findNotification (data: { userId: string, id: string }) {
		if (!mongoose.Types.ObjectId.isValid(data.id)) return null
		if (!mongoose.Types.ObjectId.isValid(data.userId)) return null
		const notification = await Notification.findOne({ _id: data.id, userId: data.userId })
		return this.mapper.mapFrom(notification)
	}

	async markNotificationSeen (data: { userId: string, id: string, seen: boolean }) {
		if (!mongoose.Types.ObjectId.isValid(data.id)) return
		if (!mongoose.Types.ObjectId.isValid(data.userId)) return
		await Notification.findOneAndUpdate({ _id: data.id, userId: data.userId }, { seen: data.seen })
	}
}