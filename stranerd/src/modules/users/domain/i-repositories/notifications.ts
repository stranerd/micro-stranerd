import { NotificationEntity } from '../entities/notifications'
import { NotificationToModel } from '../../data/models/notifications'

export interface INotificationRepository {
	findNotification (data: { userId: string, id: string }): Promise<NotificationEntity | null>

	createNotification (data: NotificationToModel): Promise<NotificationEntity | null>

	markNotificationSeen (data: { userId: string, id: string, seen: boolean }): Promise<void>

	deleteOldSeenNotifications (): Promise<void>
}