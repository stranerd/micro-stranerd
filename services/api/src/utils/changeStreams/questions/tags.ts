import { ChangeStreamCallbacks } from '@utils/commons'
import { TagEntity, TagFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('questions/tags', after)
		await getSocketEmitter().emitCreated(`questions/tags/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('questions/tags', after)
		await getSocketEmitter().emitUpdated(`questions/tags/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('questions/tags', before)
		await getSocketEmitter().emitDeleted(`questions/tags/${before.id}`, before)
	}
}