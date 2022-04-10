import { ChangeStreamCallbacks } from '@utils/commons'
import { DeleteGroupDiscussions, GroupEntity, GroupFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitPathCreated('classes/groups', after, after.classId)
		await getSocketEmitter().emitPathCreated('classes/groups', after, `${after.classId}/${after.id}`)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitPathUpdated('classes/groups', after, after.classId)
		await getSocketEmitter().emitPathUpdated('classes/groups', after, `${after.classId}/${after.id}`)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitPathDeleted('classes/groups', before, before.classId)
		await getSocketEmitter().emitPathDeleted('classes/groups', before, `${before.classId}/${before.id}`)
		await DeleteGroupDiscussions.execute(before.id)
	}
}