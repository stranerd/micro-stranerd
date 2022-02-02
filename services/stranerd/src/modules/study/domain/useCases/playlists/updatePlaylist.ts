import { PlaylistToModel } from '../../../data/models/playlists'
import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase } from '@utils/commons'
import { PlaylistEntity } from '../../entities/playlists'

type Input = { id: string, userId: string, data: Partial<PlaylistToModel> }

export class UpdatePlaylistUseCase extends BaseUseCase<Input, PlaylistEntity | null> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.userId, input.data)
	}
}
