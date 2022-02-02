import { ChangeStreamCallbacks } from '@utils/commons'
import { GetSets, PlaylistEntity, PlaylistFromModel, RemoveSetProp, UpdateSetProp } from '@modules/study'
import { getSocketEmitter } from '@index'

export const PlaylistChangeStreamCallbacks: ChangeStreamCallbacks<PlaylistFromModel, PlaylistEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('playlists', after)
		await getSocketEmitter().emitOpenCreated(`playlists/${after.id}`, after)

		const rootSet = (await GetSets.execute({
			where: [
				{ field: 'isRoot', value: true },
				{ field: 'userId', value: after.userId }
			]
		})).results[0]

		if (rootSet) await UpdateSetProp.execute({
			id: rootSet.id,
			prop: 'playlists',
			values: [after.id],
			userId: after.userId,
			add: true
		})
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