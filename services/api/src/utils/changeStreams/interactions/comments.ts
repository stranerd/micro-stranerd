import { ChangeStreamCallbacks } from '@stranerd/api-commons'
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
		await getSocketEmitter().emitCreated(`interactions/comments/${after.entity.type}/${after.entity.id}`, after)
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
		await getSocketEmitter().emitUpdated(`interactions/comments/${after.entity.type}/${after.entity.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`interactions/comments/${before.entity.type}/${before.entity.id}`, before)
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