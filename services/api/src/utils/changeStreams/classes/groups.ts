import { ChangeStreamCallbacks } from '@utils/app/package'
import { GroupEntity, GroupFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { ChatMetasUseCases, ChatsUseCases, ChatType } from '@modules/messaging'

export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/${after.classId}/groups`, after)
		await getSocketEmitter().emitCreated(`classes/${after.classId}/groups/${after.id}`, after)
		await ChatMetasUseCases.add({
			members: after.getAllUsers(),
			data: {
				type: ChatType.classes,
				group: after.getEmbedded()
			}
		})
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitUpdated(`classes/${after.classId}/groups`, after)
		await getSocketEmitter().emitUpdated(`classes/${after.classId}/groups/${after.id}`, after)

		const shouldUpdateMeta = changes.name || changes.users
		if (shouldUpdateMeta) await ChatMetasUseCases.updateClassGroup(after.getEmbedded(), after.getAllUsers())
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/${before.classId}/groups`, before)
		await getSocketEmitter().emitDeleted(`classes/${before.classId}/groups/${before.id}`, before)
		await ChatMetasUseCases.deleteGroupMeta(before.id)
		await ChatsUseCases.deleteClassGroupChats(before.id)
	}
}