import { BaseUseCase } from '@utils/commons'
import { INotificationRepository } from '../../i-repositories/notifications'

type Input = { userId: string, id: string, seen: boolean }

export class MarkNotificationSeenUseCase implements BaseUseCase<Input, void> {
	repository: INotificationRepository

	constructor (repo: INotificationRepository) {
		this.repository = repo
	}

	async execute (input) {
		return await this.repository.markNotificationSeen(input)
	}
}