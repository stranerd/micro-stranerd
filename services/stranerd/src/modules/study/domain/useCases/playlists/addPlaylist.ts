import { PlaylistToModel } from '../../../data/models/playlists'
import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase } from '@utils/commons'
import { PlaylistEntity } from '../../entities/playlists'

export class AddPlaylistUseCase extends BaseUseCase<PlaylistToModel, PlaylistEntity> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (data: PlaylistToModel) {
		return await this.repository.add(data)
	}
}
