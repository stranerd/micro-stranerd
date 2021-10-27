import { BaseUseCase } from '@utils/commons'
import { INotificationRepository } from '../../i-repositories/notifications'

type Input = { userId: string, ids?: string[], seen: boolean }

export class MarkNotificationsSeenUseCase implements BaseUseCase<Input, void> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.markNotificationsSeen(input)
	}
}