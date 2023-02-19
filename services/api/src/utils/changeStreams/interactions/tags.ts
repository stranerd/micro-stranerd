import { TagEntity, TagFromModel, TagTypes } from '@modules/interactions'
import { QuestionsUseCases } from '@modules/questions'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const TagDbChangeCallbacks: DbChangeCallbacks<TagFromModel, TagEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('interactions/tags', after)
		await appInstance.listener.created(`interactions/tags/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('interactions/tags', after)
		await appInstance.listener.updated(`interactions/tags/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('interactions/tags', before)
		await appInstance.listener.deleted(`interactions/tags/${before.id}`, before)

		if (before.type === TagTypes.questions) await QuestionsUseCases.deleteTagQuestions(before.id)
	}
}