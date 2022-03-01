import { IAnnouncementRepository } from '../../irepositories/announcements'
import { BaseUseCase } from '@utils/commons'
import { AnnouncementEntity } from '../../entities/announcements'

export class FindAnnouncementUseCase extends BaseUseCase<string, AnnouncementEntity | null> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
