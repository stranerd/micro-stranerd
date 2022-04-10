import { ChangeStreamCallbacks } from '@utils/commons'
import { DeleteGroupDiscussions, GroupEntity, GroupFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

getSocketEmitter().register('classes/groups', getSocketEmitter().quickRegisters.isOpen)
export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('classes/groups', after)
		await getSocketEmitter().emitCreated(`classes/groups/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('classes/groups', after)
		await getSocketEmitter().emitUpdated(`classes/groups/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('classes/groups', before)
		await getSocketEmitter().emitDeleted(`classes/groups/${before.id}`, before)
		await DeleteGroupDiscussions.execute(before.id)
	}
}