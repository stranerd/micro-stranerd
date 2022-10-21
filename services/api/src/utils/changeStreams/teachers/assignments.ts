import { ChangeStreamCallbacks } from '@utils/app/package'
import { AssignmentEntity, AssignmentFromModel, AssignmentSubmissionsUseCases } from '@modules/teachers'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { EventTypes } from '@utils/app/types'

export const AssignmentChangeStreamCallbacks: ChangeStreamCallbacks<AssignmentFromModel, AssignmentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/assignments`, after)
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/assignments/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/assignments`, after)
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/assignments/${after.id}`, after)
		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/assignments`, before)
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/assignments/${before.id}`, before)
		await AssignmentSubmissionsUseCases.deleteAssignmentSubmissions(before.id)
		await Promise.all(
			before.attachments.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment))
		)
	}
}