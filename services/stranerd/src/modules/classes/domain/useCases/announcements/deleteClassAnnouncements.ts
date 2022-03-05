import { BaseUseCase } from '@utils/commons'
import { IAnnouncementRepository } from '../../irepositories/announcements'

export class DeleteClassAnnouncementsUseCase extends BaseUseCase<string, boolean> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (classId: string) {
		return await this.repository.deleteClassAnnouncements(classId)
	}
}
