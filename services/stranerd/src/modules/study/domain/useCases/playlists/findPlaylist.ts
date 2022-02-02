import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase } from '@utils/commons'
import { PlaylistEntity } from '../../../domain/entities/playlists'

export class FindPlaylistUseCase extends BaseUseCase<string, PlaylistEntity | null> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
