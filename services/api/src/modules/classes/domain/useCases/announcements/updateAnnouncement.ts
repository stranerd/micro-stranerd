import { AnnouncementToModel } from '../../../data/models/announcements'
import { IAnnouncementRepository } from '../../irepositories/announcements'
import { BaseUseCase } from '@utils/commons'
import { AnnouncementEntity } from '../../entities/announcements'

type Input = { classId: string, id: string, userId: string, data: Partial<AnnouncementToModel> }

export class UpdateAnnouncementUseCase extends BaseUseCase<Input, AnnouncementEntity | null> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}
}
