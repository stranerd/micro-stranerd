import { ChangeStreamCallbacks } from '@utils/commons'
import { DiscussionEntity, DiscussionFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const DiscussionChangeStreamCallbacks: ChangeStreamCallbacks<DiscussionFromModel, DiscussionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/discussions', after)
		await getSocketEmitter().emitOpenCreated(`classes/discussions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('classes/discussions', after)
		await getSocketEmitter().emitOpenUpdated(`classes/discussions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('classes/discussions', before)
		await getSocketEmitter().emitOpenDeleted(`classes/discussions/${before.id}`, before)
	}
}