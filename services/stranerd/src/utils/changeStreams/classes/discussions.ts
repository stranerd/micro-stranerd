import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DiscussionEntity, DiscussionFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

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

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}