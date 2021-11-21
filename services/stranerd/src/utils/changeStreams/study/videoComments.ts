import { ChangeStreamCallbacks } from '@utils/commons'
import { UpdateVideosCommentsCount, VideoCommentEntity, VideoCommentFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const VideoCommentChangeStreamCallbacks: ChangeStreamCallbacks<VideoCommentFromModel, VideoCommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('videoComments', after)
		await getSocketEmitter().emitOpenCreated(`videoComments/${after.id}`, after)

		await UpdateVideosCommentsCount.execute({ id: after.videoId, increment: true })
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('videoComments', after)
		await getSocketEmitter().emitOpenUpdated(`videoComments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('videoComments', before)
		await getSocketEmitter().emitOpenDeleted(`videoComments/${before.id}`, before)

		await UpdateVideosCommentsCount.execute({ id: before.videoId, increment: false })
	}
}