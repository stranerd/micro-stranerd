import { AuthApps, ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DiscussionEntity, DiscussionFromModel, FindGroup } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const DiscussionChangeStreamCallbacks: ChangeStreamCallbacks<DiscussionFromModel, DiscussionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/discussions', after)
		await getSocketEmitter().emitOpenCreated(`classes/discussions/${after.id}`, after)

		const group = await FindGroup.execute(after.groupId)
		if (!group) return
		const users = group.getAllUsers().filter((userId) => userId !== after.userId)
		const body = after.media ? 'Shared a file' : after.content
		await publishers[EventTypes.PUSHNOTIFICATION].publish({
			userIds: users, app: AuthApps.Stranerd,
			title: group.name, body: `${after.userBio.firstName} ${after.userBio.lastName}: ${body}`,
			data: {
				type: 'classes-discussions',
				data: { id: after.id, classId: group.classId, groupId: group.id }
			}
		})
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('classes/discussions', after)
		await getSocketEmitter().emitOpenUpdated(`classes/discussions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('classes/discussions', before)
		await getSocketEmitter().emitOpenDeleted(`classes/discussions/${before.id}`, before)

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}