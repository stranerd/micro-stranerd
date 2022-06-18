import { ChangeStreamCallbacks } from '@utils/commons'
import { InteractionEntities, LikeEntity, LikeFromModel } from '@modules/interactions'
import { getSocketEmitter } from '@index'
import { AnswerMetaType, AnswersUseCases } from '@modules/questions'

export const LikeChangeStreamCallbacks: ChangeStreamCallbacks<LikeFromModel, LikeEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('interactions/likes', after)
		await getSocketEmitter().emitCreated(`interactions/likes/${after.id}`, after)
		if (after.entity.type === InteractionEntities.answers) await AnswersUseCases.updateAnswerMeta({
			id: after.entity.id,
			property: after.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
			value: 1
		})
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated('interactions/likes', after)
		await getSocketEmitter().emitUpdated(`interactions/likes/${after.id}`, after)
		if (changes.value && after.entity.type === InteractionEntities.answers) {
			await AnswersUseCases.updateAnswerMeta({
				id: after.entity.id,
				property: before.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
				value: -1
			})
			await AnswersUseCases.updateAnswerMeta({
				id: after.entity.id,
				property: after.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
				value: 1
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('interactions/likes', before)
		await getSocketEmitter().emitDeleted(`interactions/likes/${before.id}`, before)
		if (before.entity.type === InteractionEntities.answers) await AnswersUseCases.updateAnswerMeta({
			id: before.entity.id,
			property: before.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
			value: -1
		})
	}
}