import { IPlaylistRepository } from '../../irepositories/playlists'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { PlaylistEntity } from '../../entities/playlists'

export class GetPlaylistsUseCase extends BaseUseCase<QueryParams, QueryResults<PlaylistEntity>> {
	private repository: IPlaylistRepository

	constructor (repository: IPlaylistRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
