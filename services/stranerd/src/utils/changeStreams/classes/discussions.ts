import { AuthApps, ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { DiscussionEntity, DiscussionFromModel, FindGroup } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const DiscussionChangeStreamCallbacks: ChangeStreamCallbacks<DiscussionFromModel, DiscussionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitPathCreated('classes/discussions', after, after.classId)
		await getSocketEmitter().emitPathCreated('classes/discussions', after, `${after.classId}/${after.id}`)

		const group = await FindGroup.execute({ id: after.groupId, classId: after.classId })
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
		await getSocketEmitter().emitPathUpdated('classes/discussions', after, after.classId)
		await getSocketEmitter().emitPathUpdated('classes/discussions', after, `${after.classId}/${after.id}`)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitPathDeleted('classes/discussions', before, before.classId)
		await getSocketEmitter().emitPathDeleted('classes/discussions', before, `${before.classId}/${before.id}`)

		if (before.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}