import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DeletePropertyComments, RemoveSetProp, SetSaved, VideoEntity, VideoFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { IncrementUserMetaCount, ScoreRewards, UpdateUserNerdScore, UserMeta } from '@modules/users'

export const VideoChangeStreamCallbacks: ChangeStreamCallbacks<VideoFromModel, VideoEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('study/videos', after)
		await getSocketEmitter().emitOpenCreated(`study/videos/${after.id}`, after)

		await UpdateUserNerdScore.execute({
			userId: after.userId,
			amount: ScoreRewards.NewVideo
		})
		await IncrementUserMetaCount.execute({ id: after.userId, value: 1, property: UserMeta.videos })
	},
	updated: async ({ before, changes, after }) => {
		await getSocketEmitter().emitOpenUpdated('study/videos', after)
		await getSocketEmitter().emitOpenUpdated(`study/videos/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
		if (changes.preview) await publishers[EventTypes.DELETEFILE].publish(before.preview)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('study/videos', before)
		await getSocketEmitter().emitOpenDeleted(`study/videos/${before.id}`, before)

		await RemoveSetProp.execute({ prop: SetSaved.videos, value: before.id })
		await UpdateUserNerdScore.execute({
			userId: before.userId,
			amount: -ScoreRewards.NewVideo
		})
		await IncrementUserMetaCount.execute({ id: before.userId, value: -1, property: UserMeta.videos })

		await DeletePropertyComments.execute({ property: 'videoId', propertyId: before.id })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
		await publishers[EventTypes.DELETEFILE].publish(before.preview)
	}
}