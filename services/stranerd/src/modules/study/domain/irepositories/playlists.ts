import { PlaylistEntity } from '../entities/playlists'
import { PlaylistToModel } from '../../data/models/playlists'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio } from '../types'

export interface IPlaylistRepository {
	add: (data: PlaylistToModel) => Promise<PlaylistEntity>
	get: (condition: QueryParams) => Promise<QueryResults<PlaylistEntity>>
	find: (id: string) => Promise<PlaylistEntity | null>
	update: (id: string, userId: string, data: Partial<PlaylistToModel>) => Promise<PlaylistEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updatePlaylistsUserBio: (userId: string, userBio: UserBio) => Promise<boolean>
	removeVideoFromPlaylists: (videoId: string) => Promise<boolean>
}