import { ChangeStreamCallbacks } from '@utils/app/package'
import { TagEntity, TagFromModel, TagTypes } from '@modules/interactions'
import { QuestionsUseCases } from '@modules/questions'
import { appInstance } from '@utils/app/types'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('interactions/tags', after)
		await appInstance.socketEmitter.emitCreated(`interactions/tags/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('interactions/tags', after)
		await appInstance.socketEmitter.emitUpdated(`interactions/tags/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('interactions/tags', before)
		await appInstance.socketEmitter.emitDeleted(`interactions/tags/${before.id}`, before)

		if (before.type === TagTypes.questions) await QuestionsUseCases.deleteTagQuestions(before.id)
	}
}