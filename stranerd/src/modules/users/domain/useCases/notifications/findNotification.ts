import { BaseUseCase } from '@utils/commons'
import { NotificationEntity } from '../../entities/notifications'
import { INotificationRepository } from '../../i-repositories/notifications'

type Input = { userId: string, id: string }

export class FindNotificationUseCase implements BaseUseCase<Input, NotificationEntity | null> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.findNotification(input)
	}
}