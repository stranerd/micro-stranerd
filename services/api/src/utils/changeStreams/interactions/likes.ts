import { InteractionEntities, LikeEntity, LikeFromModel } from '@modules/interactions'
import { AnswerMetaType, AnswersUseCases } from '@modules/questions'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const LikeChangeStreamCallbacks: ChangeStreamCallbacks<LikeFromModel, LikeEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('interactions/likes', after)
		await appInstance.socketEmitter.emitCreated(`interactions/likes/${after.id}`, after)
		if (after.entity.type === InteractionEntities.answers) await AnswersUseCases.updateMeta({
			id: after.entity.id,
			property: after.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
			value: 1
		})
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.socketEmitter.emitUpdated('interactions/likes', after)
		await appInstance.socketEmitter.emitUpdated(`interactions/likes/${after.id}`, after)
		if (changes.value && after.entity.type === InteractionEntities.answers) {
			await AnswersUseCases.updateMeta({
				id: after.entity.id,
				property: before.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
				value: -1
			})
			await AnswersUseCases.updateMeta({
				id: after.entity.id,
				property: after.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
				value: 1
			})
		}
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('interactions/likes', before)
		await appInstance.socketEmitter.emitDeleted(`interactions/likes/${before.id}`, before)
		if (before.entity.type === InteractionEntities.answers) await AnswersUseCases.updateMeta({
			id: before.entity.id,
			property: before.value ? AnswerMetaType.likes : AnswerMetaType.dislikes,
			value: -1
		})
	}
}