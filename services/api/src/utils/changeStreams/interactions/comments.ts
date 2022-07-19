import { ChangeStreamCallbacks } from '@utils/commons'
import {
	CommentEntity,
	CommentFromModel,
	CommentMetaType,
	CommentsUseCases,
	InteractionEntities
} from '@modules/interactions'
import { getSocketEmitter } from '@index'
import { AnswerMetaType, AnswersUseCases, QuestionMetaType, QuestionsUseCases } from '@modules/questions'

export const CommentChangeStreamCallbacks: ChangeStreamCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('interactions/comments', after)
		await getSocketEmitter().emitCreated(`interactions/comments/${after.id}`, after)
		if (after.entity.type === InteractionEntities.questions) await QuestionsUseCases.updateMeta({
			id: after.entity.id,
			property: QuestionMetaType.comments,
			value: 1
		})
		if (after.entity.type === InteractionEntities.answers) await AnswersUseCases.updateMeta({
			id: after.entity.id,
			property: AnswerMetaType.comments,
			value: 1
		})
		if (after.entity.type === InteractionEntities.comments) await CommentsUseCases.updateMeta({
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
		if (before.entity.type === InteractionEntities.questions) await QuestionsUseCases.updateMeta({
			id: before.entity.id,
			property: QuestionMetaType.comments,
			value: -1
		})
		if (before.entity.type === InteractionEntities.answers) await AnswersUseCases.updateMeta({
			id: before.entity.id,
			property: AnswerMetaType.comments,
			value: -1
		})
		if (before.entity.type === InteractionEntities.comments) await CommentsUseCases.updateMeta({
			id: before.entity.id,
			property: CommentMetaType.comments,
			value: -1
		})
	}
}