import { ChangeStreamCallbacks } from '@utils/commons'
import { TagEntity, TagFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('tags', after)
		await getSocketEmitter().emitOpenCreated(`tags/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('tags', after)
		await getSocketEmitter().emitOpenUpdated(`tags/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('tags', before)
		await getSocketEmitter().emitOpenDeleted(`tags/${before.id}`, before)
	}
}