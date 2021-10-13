import { ChangeStreamCallbacks } from '@utils/commons'
import { SubjectEntity, SubjectFromModel } from '@modules/questions'
import { getSocketEmitter } from '@index'

export const SubjectChangeStreamCallbacks: ChangeStreamCallbacks<SubjectFromModel, SubjectEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('subjects', after)
		await getSocketEmitter().emitOpenCreated(`subjects/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('subjects', after)
		await getSocketEmitter().emitOpenUpdated(`subjects/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('subjects', before)
		await getSocketEmitter().emitOpenDeleted(`subjects/${before.id}`, before)
	}
}