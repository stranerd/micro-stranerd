import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase } from '@utils/commons'

export class RemoveVideoFromPlaylistUseCase extends BaseUseCase<string, boolean> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (videoId: string) {
		return await this.repository.removeVideoFromPlaylists(videoId)
	}
}
