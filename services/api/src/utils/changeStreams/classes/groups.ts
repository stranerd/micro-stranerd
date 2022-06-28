import { ChangeStreamCallbacks } from '@utils/commons'
import { DiscussionsUseCases, GroupEntity, GroupFromModel } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { ChatMetasUseCases, ChatsUseCases, ChatType } from '@modules/sessions'

export const GroupChangeStreamCallbacks: ChangeStreamCallbacks<GroupFromModel, GroupEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/groups/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/groups/${after.classId}/${after.id}`, after)
		await ChatMetasUseCases.add({
			members: after.getAllUsers(),
			data: {
				type: ChatType.discussions,
				group: after.getEmbedded()
			}
		})
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitUpdated(`classes/groups/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/groups/${after.classId}/${after.id}`, after)

		if (changes.name) await ChatMetasUseCases.updateClassGroup(after.getEmbedded())
		if (changes.users) await ChatMetasUseCases.updateClassGroupMembers(after.id, after.getAllUsers())
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/groups/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/groups/${before.classId}/${before.id}`, before)
		await DiscussionsUseCases.deleteGroupDiscussions(before.id)
		await ChatsUseCases.deleteClassGroupDiscussions(before.id)
	}
}