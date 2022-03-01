import { BaseUseCase } from '@utils/commons'
import { IAnnouncementRepository } from '../../irepositories/announcements'
import { ClassUsers } from '../../types'

type Input = { classId: string, users: Record<ClassUsers, string[]> }

export class UpdateAnnouncementsUsersUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnnouncementsUsers(input.classId, input.users)
	}
}
