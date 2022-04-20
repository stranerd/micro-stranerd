import { BaseUseCase } from '@utils/commons'
import { INotificationRepository } from '../../i-repositories/notifications'
import { NotificationToModel } from '../../../data/models/notifications'
import { NotificationEntity } from '../../entities/notifications'

export class CreateNotificationUseCase implements BaseUseCase<NotificationToModel[], NotificationEntity[]> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute (input: NotificationToModel[]) {
		return await this.repository.createNotification(input)
	}
}