import { IPlaylistRepository } from '../../domain/irepositories/playlists'
import { PlaylistMapper } from '../mappers/playlists'
import { PlaylistFromModel, PlaylistToModel } from '../models/playlists'
import { Playlist } from '../mongooseModels/playlists'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '../../domain/types'

export class PlaylistRepository implements IPlaylistRepository {
	private static instance: PlaylistRepository
	private mapper: PlaylistMapper

	private constructor () {
		this.mapper = new PlaylistMapper()
	}

	static getInstance () {
		if (!PlaylistRepository.instance) PlaylistRepository.instance = new PlaylistRepository()
		return PlaylistRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<PlaylistFromModel>(Playlist, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: PlaylistToModel) {
		const playlist = await new Playlist(data).save()
		return this.mapper.mapFrom(playlist)!
	}

	async find (id: string) {
		const playlist = await Playlist.findById(id)
		return this.mapper.mapFrom(playlist)
	}

	async update (id: string, userId: string, data: Partial<PlaylistToModel>) {
		const playlist = await Playlist.findOneAndUpdate({ _id: id, userId }, { $set: data })
		return this.mapper.mapFrom(playlist)
	}

	async updatePlaylistsUserBio (userId: string, userBio: UserBio) {
		const playlists = await Playlist.updateMany({ userId }, { $set: { userBio } })
		return playlists.acknowledged
	}

	async delete (id: string, userId: string) {
		const playlist = await Playlist.findOneAndDelete({ _id: id, userId })
		return !!playlist
	}

	async removeVideoFromPlaylists (videoId: string) {
		const playlists = await Playlist.updateMany({ links: videoId }, {
			$pull: { links: videoId }
		})
		return playlists.acknowledged
	}
}
