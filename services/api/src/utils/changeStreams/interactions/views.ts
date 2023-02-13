import { ViewEntity, ViewFromModel } from '@modules/interactions'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ViewChangeStreamCallbacks: ChangeStreamCallbacks<ViewFromModel, ViewEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('interactions/views', after)
		await appInstance.socketEmitter.emitCreated(`interactions/views/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('interactions/views', after)
		await appInstance.socketEmitter.emitUpdated(`interactions/views/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('interactions/views', before)
		await appInstance.socketEmitter.emitDeleted(`interactions/views/${before.id}`, before)
	}
}