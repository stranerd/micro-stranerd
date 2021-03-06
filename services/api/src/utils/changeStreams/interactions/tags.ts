import { ChangeStreamCallbacks } from '@utils/commons'
import { TagEntity, TagFromModel, TagTypes } from '@modules/interactions'
import { getSocketEmitter } from '@index'
import { QuestionsUseCases } from '@modules/questions'
import { DepartmentsUseCases } from '@modules/school'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('interactions/tags', after)
		await getSocketEmitter().emitCreated(`interactions/tags/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('interactions/tags', after)
		await getSocketEmitter().emitUpdated(`interactions/tags/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('interactions/tags', before)
		await getSocketEmitter().emitDeleted(`interactions/tags/${before.id}`, before)

		if (before.type === TagTypes.questions) await QuestionsUseCases.deleteTagQuestions(before.id)
		if (before.type === TagTypes.departments) await DepartmentsUseCases.deleteTagDepartments(before.id)
	}
}