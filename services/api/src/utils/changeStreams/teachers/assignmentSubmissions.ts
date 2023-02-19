import { AssignmentSubmissionEntity, AssignmentSubmissionFromModel } from '@modules/teachers'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const AssignmentSubmissionDbChangeCallbacks: DbChangeCallbacks<AssignmentSubmissionFromModel, AssignmentSubmissionEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`teachers/${after.courseId}/assignmentSubmissions`, after)
		await appInstance.listener.created(`teachers/${after.courseId}/assignmentSubmissions/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated(`teachers/${after.courseId}/assignmentSubmissions`, after)
		await appInstance.listener.updated(`teachers/${after.courseId}/assignmentSubmissions/${after.id}`, after)
		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`teachers/${before.courseId}/assignmentSubmissions`, before)
		await appInstance.listener.deleted(`teachers/${before.courseId}/assignmentSubmissions/${before.id}`, before)
		await Promise.all(
			before.attachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
		)
	}
}