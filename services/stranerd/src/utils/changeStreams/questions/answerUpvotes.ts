import { ChangeStreamCallbacks } from '@utils/commons'
import { AnswerUpvoteEntity, AnswerUpvoteFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'

export const AnswerUpvoteChangeStreamCallbacks: ChangeStreamCallbacks<AnswerUpvoteFromModel, AnswerUpvoteEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('answerUpvotes', after)
		await getSocketEmitter().emitOpenCreated(`answerUpvotes/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('answerUpvotes', after)
		await getSocketEmitter().emitOpenUpdated(`answerUpvotes/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('answerUpvotes', before)
		await getSocketEmitter().emitOpenDeleted(`answerUpvotes/${before.id}`, before)
	}
}