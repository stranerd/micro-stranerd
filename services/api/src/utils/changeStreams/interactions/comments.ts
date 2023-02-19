import {
	CommentEntity,
	CommentFromModel,
	CommentMetaType,
	CommentsUseCases,
	InteractionEntities
} from '@modules/interactions'
import { AnswerMetaType, AnswersUseCases, QuestionMetaType, QuestionsUseCases } from '@modules/questions'
import { NotificationType } from '@modules/users'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { sendNotification } from '@utils/modules/users/notifications'

export const CommentDbChangeCallbacks: DbChangeCallbacks<CommentFromModel, CommentEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('interactions/comments', after)
		await appInstance.listener.created(`interactions/comments/${after.id}`, after)
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
		await appInstance.listener.updated('interactions/comments', after)
		await appInstance.listener.updated(`interactions/comments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('interactions/comments', before)
		await appInstance.listener.deleted(`interactions/comments/${before.id}`, before)
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