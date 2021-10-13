import { ChangeStreamCallbacks } from '@utils/commons'
import { SchoolEntity, SchoolFromModel } from '@modules/resources'
import { getSocketEmitter } from '@index'

export const SchoolChangeStreamCallbacks: ChangeStreamCallbacks<SchoolFromModel, SchoolEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('schools', after)
		await getSocketEmitter().emitOpenCreated(`schools/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('schools', after)
		await getSocketEmitter().emitOpenUpdated(`schools/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('schools', before)
		await getSocketEmitter().emitOpenDeleted(`schools/${before.id}`, before)
	}
}