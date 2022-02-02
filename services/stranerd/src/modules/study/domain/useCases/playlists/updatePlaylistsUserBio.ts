import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase } from '@utils/commons'
import { UserBio } from '../../types'

type Input = { userId: string, userBio: UserBio }

export class UpdatePlaylistsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updatePlaylistsUserBio(input.userId, input.userBio)
	}
}
