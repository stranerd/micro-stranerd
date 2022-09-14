import { ChangeStreamCallbacks } from '@utils/app/package'
import {
	CommentEntity,
	CommentFromModel,
	CommentMetaType,
	CommentsUseCases,
	InteractionEntities
} from '@modules/interactions'
import { getSocketEmitter } from '@index'
import { AnswerMetaType, AnswersUseCases, QuestionMetaType, QuestionsUseCases } from '@modules/questions'
import { sendNotification } from '@utils/modules/users/notifications'
import { NotificationType } from '@modules/users'

export const CommentChangeStreamCallbacks: ChangeStreamCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('interactions/comments', after)
		await getSocketEmitter().emitCreated(`interactions/comments/${after.id}`, after)
		if (after.entity.type === InteractionEntities.questions) {
			await QuestionsUseCases.updateMeta({
				id: after.entity.id,
				property: QuestionMetaType.comments,
				value: 1
			})
			const question = await QuestionsUseCases.find(after.entity.id)
			if (question) await sendNotification([question.user.id], {
				title: `${after.user.bio.fullName} dropped a comment`,
				body: after.body,
				data: {
					type: NotificationType.NewQuestionComment,
					questionId: after.entity.id,
					userId: after.user.id,
					commentId: after.id
				},
				sendEmail: false
			})
		}
		if (after.entity.type === InteractionEntities.answers) {
			await AnswersUseCases.updateMeta({
				id: after.entity.id,
				property: AnswerMetaType.comments,
				value: 1
			})
			const answer = await AnswersUseCases.find(after.entity.id)
			if (answer) await sendNotification([answer.user.id], {
				title: `${after.user.bio.fullName} dropped a comment`,
				body: after.body,
				data: {
					type: NotificationType.NewAnswerComment,
					answerId: after.entity.id,
					questionId: answer.questionId,
					userId: after.user.id,
					commentId: after.id
				},
				sendEmail: false
			})
		}
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