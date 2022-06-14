import { ChangeStreamCallbacks } from '@stranerd/api-commons'
import { ViewEntity, ViewFromModel } from '@modules/interactions'
import { getSocketEmitter } from '@index'

export const ViewChangeStreamCallbacks: ChangeStreamCallbacks<ViewFromModel, ViewEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`interactions/views/${after.entity.type}/${after.entity.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`interactions/views/${after.entity.type}/${after.entity.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`interactions/views/${before.entity.type}/${before.entity.id}`, before)
	}
}