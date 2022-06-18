import { ChangeStreamCallbacks } from '@utils/commons'
import {
	CommentEntity,
	CommentFromModel,
	CommentMetaType,
	CommentsUseCases,
	InteractionEntities
} from '@modules/interactions'
import { getSocketEmitter } from '@index'
import { AnswersUseCases } from '@modules/questions'
import { AnswerMetaType } from '@modules/questions/domain/types'

export const CommentChangeStreamCallbacks: ChangeStreamCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('interactions/comments', after)
		await getSocketEmitter().emitCreated(`interactions/comments/${after.id}`, after)
		if (after.entity.type === InteractionEntities.answers) await AnswersUseCases.updateAnswerMeta({
			id: after.entity.id,
			property: AnswerMetaType.comments,
			value: 1
		})
		if (after.entity.type === InteractionEntities.comments) await CommentsUseCases.updateCommentMeta({
			id: after.entity.id,
			property: CommentMetaType.comments,
			value: 1
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('interactions/comments', after)
		await getSocketEmitter().emitUpdated(`interactions/comments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('interactions/comments', before)
		await getSocketEmitter().emitDeleted(`interactions/comments/${before.id}`, before)
		await CommentsUseCases.deleteEntityComments({ type: InteractionEntities.comments, id: before.id })
		if (before.entity.type === InteractionEntities.answers) await AnswersUseCases.updateAnswerMeta({
			id: before.entity.id,
			property: AnswerMetaType.comments,
			value: -1
		})
		if (before.entity.type === InteractionEntities.comments) await CommentsUseCases.updateCommentMeta({
			id: before.entity.id,
			property: CommentMetaType.comments,
			value: -1
		})
	}
}