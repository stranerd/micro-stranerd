import { ChangeStreamCallbacks } from '@utils/commons'
import { SchemeEntity, SchemeFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const SchemeChangeStreamCallbacks: ChangeStreamCallbacks<SchemeFromModel, SchemeEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/schemes/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/schemes/${after.classId}/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`classes/schemes/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/schemes/${after.classId}/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/schemes/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/schemes/${before.classId}/${before.id}`, before)
	}
}