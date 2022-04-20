import { IAnnouncementRepository } from '../../irepositories/announcements'
import { BaseUseCase } from '@utils/commons'
import { AnnouncementEntity } from '../../entities/announcements'

type Input = { classId: string, id: string }

export class FindAnnouncementUseCase extends BaseUseCase<Input, AnnouncementEntity | null> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.find(input.classId, input.id)
	}
}
