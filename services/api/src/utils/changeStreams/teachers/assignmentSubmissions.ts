import { ChangeStreamCallbacks } from '@utils/app/package'
import { AssignmentSubmissionEntity, AssignmentSubmissionFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const AssignmentSubmissionChangeStreamCallbacks: ChangeStreamCallbacks<AssignmentSubmissionFromModel, AssignmentSubmissionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/assignmentSubmissions`, after)
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/assignmentSubmissions/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/assignmentSubmissions`, after)
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/assignmentSubmissions/${after.id}`, after)
		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/assignmentSubmissions`, before)
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/assignmentSubmissions/${before.id}`, before)
		await Promise.all(
			before.attachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
		)
	}
}