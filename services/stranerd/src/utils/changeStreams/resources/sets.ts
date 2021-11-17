import { ChangeStreamCallbacks } from '@utils/commons'
import { SetEntity, SetFromModel } from '@modules/resources'
import { getSocketEmitter } from '@index'

export const SetChangeStreamCallbacks: ChangeStreamCallbacks<SetFromModel, SetEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('sets', after, after.userId)
		await getSocketEmitter().emitMineCreated(`sets/${after.id}`, after, after.userId)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('sets', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`sets/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('sets', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`sets/${before.id}`, before, before.userId)
	}
}