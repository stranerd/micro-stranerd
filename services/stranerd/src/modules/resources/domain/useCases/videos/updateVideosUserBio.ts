import { IVideoRepository } from '../../irepositories/videos'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types'

type Input = { userId: string, userBio: UserBio }

export class UpdateVideosUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateVideosUserBio(input.userId, input.userBio)
	}
}
