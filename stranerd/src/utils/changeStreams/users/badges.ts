import { ChangeStreamCallbacks } from '@utils/commons'
import { BadgeEntity, BadgeFromModel } from '@modules/users'
import { getSocketEmitter } from '@index'

export const BadgeChangeStreamCallbacks: ChangeStreamCallbacks<BadgeFromModel, BadgeEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('badges', after, after.userId)
		await getSocketEmitter().emitMineCreated(`badges/${after.id}`, after, after.userId)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitMineUpdated('badges', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`badges/${after.id}`, after, after.userId)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('badges', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`badges/${before.id}`, before, before.userId)
	}
}