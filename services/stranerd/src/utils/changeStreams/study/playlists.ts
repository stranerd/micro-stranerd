import { ChangeStreamCallbacks } from '@utils/commons'
import { PlaylistEntity, PlaylistFromModel, RemoveSetProp } from '@modules/study'
import { getSocketEmitter } from '@index'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

export const PlaylistChangeStreamCallbacks: ChangeStreamCallbacks<PlaylistFromModel, PlaylistEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('playlists', after)
		await getSocketEmitter().emitOpenCreated(`playlists/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewPlaylist
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.playlists })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('playlists', after)
		await getSocketEmitter().emitOpenUpdated(`playlists/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('playlists', before)
		await getSocketEmitter().emitOpenDeleted(`playlists/${before.id}`, before)
		await RemoveSetProp.execute({ prop: 'playlists', value: before.id })

		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewPlaylist
		})
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.playlists })
	}
}