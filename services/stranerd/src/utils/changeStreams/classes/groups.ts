import { ChangeStreamCallbacks } from '@utils/commons'
import { GroupEntity, GroupFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/groups', after)
		await getSocketEmitter().emitOpenCreated(`classes/groups/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('classes/groups', after)
		await getSocketEmitter().emitOpenUpdated(`classes/groups/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('classes/groups', before)
		await getSocketEmitter().emitOpenDeleted(`classes/groups/${before.id}`, before)
	}
}