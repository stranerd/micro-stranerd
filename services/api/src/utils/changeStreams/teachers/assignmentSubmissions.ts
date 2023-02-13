import { AssignmentSubmissionEntity, AssignmentSubmissionFromModel } from '@modules/teachers'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const AssignmentSubmissionChangeStreamCallbacks: ChangeStreamCallbacks<AssignmentSubmissionFromModel, AssignmentSubmissionEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated(`teachers/${after.courseId}/assignmentSubmissions`, after)
		await appInstance.socketEmitter.emitCreated(`teachers/${after.courseId}/assignmentSubmissions/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.socketEmitter.emitUpdated(`teachers/${after.courseId}/assignmentSubmissions`, after)
		await appInstance.socketEmitter.emitUpdated(`teachers/${after.courseId}/assignmentSubmissions/${after.id}`, after)
		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted(`teachers/${before.courseId}/assignmentSubmissions`, before)
		await appInstance.socketEmitter.emitDeleted(`teachers/${before.courseId}/assignmentSubmissions/${before.id}`, before)
		await Promise.all(
			before.attachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
		)
	}
}