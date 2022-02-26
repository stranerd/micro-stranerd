import { BaseUseCase } from '@utils/commons'
import { IAnnouncementRepository } from '../../irepositories/announcements'

type Input = { classId: string, admins: string[] }

export class UpdateAnnouncementsAdminsUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnnouncementsAdmins(input.classId, input.admins)
	}
}
