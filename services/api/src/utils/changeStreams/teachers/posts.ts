import { ChangeStreamCallbacks } from '@utils/app/package'
import { PostEntity, PostFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { EventTypes } from '@utils/app/types'

export const PostChangeStreamCallbacks: ChangeStreamCallbacks<PostFromModel, PostEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/posts`, after)
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/posts/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/posts`, after)
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/posts/${after.id}`, after)
		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/posts`, before)
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/posts/${before.id}`, before)
		await Promise.all(
			before.attachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
		)
	}
}