import { ChangeStreamCallbacks } from '@utils/commons'
import { PlaylistEntity, PlaylistFromModel, RemoveSetProp } from '@modules/study'
import { getSocketEmitter } from '@index'

export const PlaylistChangeStreamCallbacks: ChangeStreamCallbacks<PlaylistFromModel, PlaylistEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('playlists', after)
		await getSocketEmitter().emitOpenCreated(`playlists/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('playlists', after)
		await getSocketEmitter().emitOpenUpdated(`playlists/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('playlists', before)
		await getSocketEmitter().emitOpenDeleted(`playlists/${before.id}`, before)
		await RemoveSetProp.execute({ prop: 'playlists', value: before.id })
	}
}