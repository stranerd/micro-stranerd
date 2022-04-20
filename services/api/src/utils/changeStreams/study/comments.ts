import { ChangeStreamCallbacks } from '@utils/commons'
import { CommentEntity, CommentFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const CommentChangeStreamCallbacks: ChangeStreamCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/comments', after)
		await getSocketEmitter().emitCreated(`study/comments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/comments', after)
		await getSocketEmitter().emitUpdated(`study/comments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/comments', before)
		await getSocketEmitter().emitDeleted(`study/comments/${before.id}`, before)
	}
}