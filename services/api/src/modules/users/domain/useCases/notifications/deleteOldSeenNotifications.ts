import { BaseUseCase } from '@utils/commons'
import { INotificationRepository } from '../../i-repositories/notifications'

export class DeleteOldSeenNotificationsUseCase implements BaseUseCase<void, void> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute () {
		return await this.repository.deleteOldSeenNotifications()
	}
}