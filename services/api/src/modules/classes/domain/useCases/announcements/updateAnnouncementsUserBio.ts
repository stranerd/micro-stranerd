import { BaseUseCase } from '@utils/commons'
import { UserBio, UserRoles } from '../../types'
import { IAnnouncementRepository } from '../../irepositories/announcements'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateAnnouncementsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnnouncementsUserBio(input.userId, input.userBio, input.userRoles)
	}
}
