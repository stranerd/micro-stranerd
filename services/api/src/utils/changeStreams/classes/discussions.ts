import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DiscussionEntity, DiscussionFromModel, GroupsUseCases } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { sendPushNotification } from '@utils/modules/push'

export const DiscussionChangeStreamCallbacks: ChangeStreamCallbacks<DiscussionFromModel, DiscussionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`classes/discussions/${after.classId}`, after)
		await getSocketEmitter().emitCreated(`classes/discussions/${after.classId}/${after.id}`, after)

		const group = await GroupsUseCases.find({ id: after.groupId, classId: after.classId, userId: after.user.id })
		if (!group) return
		const users = group.getAllUsers().filter((userId) => userId !== after.user.id)
		const body = after.media ? 'Shared a file' : after.content
		await sendPushNotification({
			userIds: users,
			title: group.name, body: `${after.user.bio.firstName} ${after.user.bio.lastName}: ${body}`,
			data: {
				type: 'classes-discussions',
				data: { id: after.id, classId: group.classId, groupId: group.id }
			}
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`classes/discussions/${after.classId}`, after)
		await getSocketEmitter().emitUpdated(`classes/discussions/${after.classId}/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`classes/discussions/${before.classId}`, before)
		await getSocketEmitter().emitDeleted(`classes/discussions/${before.classId}/${before.id}`, before)

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}