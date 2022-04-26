import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DeletePropertyComments, RemoveSetProp, SetSaved, VideoEntity, VideoFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { ScoreRewards, UserMeta, UsersUseCases } from '@modules/users'

export const VideoChangeStreamCallbacks: ChangeStreamCallbacks<VideoFromModel, VideoEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/videos', after)
		await getSocketEmitter().emitCreated(`study/videos/${after.id}`, after)

		await UsersUseCases.updateNerdScore({
			userId: after.userId,
			amount: ScoreRewards.NewVideo
		})
		await UsersUseCases.incrementMeta({ id: after.userId, value: 1, property: UserMeta.videos })
	},
	updated: async ({ before, changes, after }) => {
		await getSocketEmitter().emitUpdated('study/videos', after)
		await getSocketEmitter().emitUpdated(`study/videos/${after.id}`, after)

		if (changes.media && before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/videos', before)
		await getSocketEmitter().emitDeleted(`study/videos/${before.id}`, before)

		await RemoveSetProp.execute({ prop: SetSaved.videos, value: before.id })
		await UsersUseCases.updateNerdScore({
			userId: before.userId,
			amount: -ScoreRewards.NewVideo
		})
		await UsersUseCases.incrementMeta({ id: before.userId, value: -1, property: UserMeta.videos })

		await DeletePropertyComments.execute({ property: 'videoId', propertyId: before.id })

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}