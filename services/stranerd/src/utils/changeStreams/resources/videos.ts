import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DeleteVideosComments, VideoEntity, VideoFromModel } from '@modules/resources'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const VideoChangeStreamCallbacks: ChangeStreamCallbacks<VideoFromModel, VideoEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('videos', after)
		await getSocketEmitter().emitOpenCreated(`videos/${after.id}`, after)
	},
	updated: async ({ before, changes, after }) => {
		await getSocketEmitter().emitOpenUpdated('videos', after)
		await getSocketEmitter().emitOpenUpdated(`videos/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('videos', before)
		await getSocketEmitter().emitOpenDeleted(`videos/${before.id}`, before)

		await DeleteVideosComments.execute({ videoId: before.id })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}