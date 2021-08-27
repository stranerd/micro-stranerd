import { NotificationEntity } from '../entities/notifications'

export interface INotificationRepository {
	findNotification (data: { userId: string, id: string }): Promise<NotificationEntity | null>

	markNotificationSeen (data: { userId: string, id: string, seen: boolean }): Promise<void>
}