import { GroupEntity, GroupFromModel } from '@modules/classes'
import { ChatMetasUseCases, ChatsUseCases, ChatType } from '@modules/messaging'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`classes/${after.classId}/groups`, after)
		await appInstance.listener.created(`classes/${after.classId}/groups/${after.id}`, after)
		await ChatMetasUseCases.add({
			members: after.getAllUsers(),
			data: {
				type: ChatType.classes,
				group: after.getEmbedded()
			}
		})
	},
	updated: async ({ after, changes }) => {
		await appInstance.listener.updated(`classes/${after.classId}/groups`, after)
		await appInstance.listener.updated(`classes/${after.classId}/groups/${after.id}`, after)

		const shouldUpdateMeta = changes.name || changes.users
		if (shouldUpdateMeta) await ChatMetasUseCases.updateClassGroup(after.getEmbedded(), after.getAllUsers())
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`classes/${before.classId}/groups`, before)
		await appInstance.listener.deleted(`classes/${before.classId}/groups/${before.id}`, before)
		await ChatMetasUseCases.deleteGroupMeta(before.id)
		await ChatsUseCases.deleteClassGroupChats(before.id)
	}
}