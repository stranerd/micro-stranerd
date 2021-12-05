import { ChangeStreamCallbacks } from '@utils/commons'
import { CommentEntity, CommentFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const CommentChangeStreamCallbacks: ChangeStreamCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('studyComments', after)
		await getSocketEmitter().emitOpenCreated(`studyComments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('studyComments', after)
		await getSocketEmitter().emitOpenUpdated(`studyComments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('studyComments', before)
		await getSocketEmitter().emitOpenDeleted(`studyComments/${before.id}`, before)
	}
}