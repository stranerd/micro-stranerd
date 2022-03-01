import { AnnouncementToModel } from '../../../data/models/announcements'
import { IAnnouncementRepository } from '../../irepositories/announcements'
import { BaseUseCase } from '@utils/commons'
import { AnnouncementEntity } from '../../entities/announcements'

export class AddAnnouncementUseCase extends BaseUseCase<AnnouncementToModel, AnnouncementEntity> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (data: AnnouncementToModel) {
		return await this.repository.add(data)
	}
}
