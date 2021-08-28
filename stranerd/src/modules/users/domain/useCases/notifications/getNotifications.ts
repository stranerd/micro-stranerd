import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { NotificationEntity } from '../../entities/notifications'
import { INotificationRepository } from '../../i-repositories/notifications'

export class GetNotificationsUseCase implements BaseUseCase<QueryParams, QueryResults<NotificationEntity>> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute (input) {
		return await this.repository.getNotifications(input)
	}
}