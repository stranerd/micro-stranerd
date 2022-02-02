import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import {
	DeletePropertyComments,
	RemoveSetProp,
	RemoveVideoFromPlaylist,
	VideoEntity,
	VideoFromModel
} from '@modules/study'
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
		if (changes.preview) await publishers[EventTypes.DELETEFILE].publish(before.preview)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('videos', before)
		await getSocketEmitter().emitOpenDeleted(`videos/${before.id}`, before)

		await RemoveSetProp.execute({ prop: 'videos', value: before.id })
		await RemoveVideoFromPlaylist.execute(before.id)

		await DeletePropertyComments.execute({ property: 'videoId', propertyId: before.id })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
		await publishers[EventTypes.DELETEFILE].publish(before.preview)
	}
}