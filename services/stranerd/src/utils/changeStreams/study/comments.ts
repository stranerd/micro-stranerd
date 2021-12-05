import { ChangeStreamCallbacks } from '@utils/commons'
import { CommentEntity, CommentFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const CommentChangeStreamCallbacks: ChangeStreamCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('comments', after)
		await getSocketEmitter().emitOpenCreated(`comments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('comments', after)
		await getSocketEmitter().emitOpenUpdated(`comments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('comments', before)
		await getSocketEmitter().emitOpenDeleted(`comments/${before.id}`, before)
	}
}