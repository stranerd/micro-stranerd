import { ChangeStreamCallbacks } from '@utils/commons'
import { DeleteGroupDiscussions, GroupEntity, GroupFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/groups/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/groups/${after.classId}/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`classes/groups/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/groups/${after.classId}/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/groups/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/groups/${before.classId}/${before.id}`, before)
		await DeleteGroupDiscussions.execute(before.id)
	}
}