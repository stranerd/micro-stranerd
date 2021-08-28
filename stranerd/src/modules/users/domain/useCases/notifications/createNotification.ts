import { BaseUseCase } from '@utils/commons'
import { INotificationRepository } from '../../i-repositories/notifications'
import { NotificationToModel } from '../../../data/models/notifications'
import { NotificationEntity } from '../../entities/notifications'

export class CreateNotificationUseCase implements BaseUseCase<NotificationToModel, NotificationEntity | null> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute (input) {
		return await this.repository.createNotification(input)
	}
}