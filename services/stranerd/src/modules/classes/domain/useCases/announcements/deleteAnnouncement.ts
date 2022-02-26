import { IAnnouncementRepository } from '../../irepositories/announcements'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteAnnouncementUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.delete(data.id, data.userId)
	}
}
