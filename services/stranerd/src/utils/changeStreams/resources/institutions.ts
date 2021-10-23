import { ChangeStreamCallbacks } from '@utils/commons'
import { InstitutionEntity, InstitutionFromModel } from '@modules/resources'
import { getSocketEmitter } from '@index'

export const InstitutionChangeStreamCallbacks: ChangeStreamCallbacks<InstitutionFromModel, InstitutionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('institutions', after)
		await getSocketEmitter().emitOpenCreated(`institutions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('institutions', after)
		await getSocketEmitter().emitOpenUpdated(`institutions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('institutions', before)
		await getSocketEmitter().emitOpenDeleted(`institutions/${before.id}`, before)
	}
}