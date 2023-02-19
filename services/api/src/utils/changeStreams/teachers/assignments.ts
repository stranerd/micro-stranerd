import {
	AssignmentEntity,
	AssignmentFromModel,
	AssignmentSubmissionsUseCases,
	PostsUseCases,
	PostType
} from '@modules/teachers'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const AssignmentDbChangeCallbacks: DbChangeCallbacks<AssignmentFromModel, AssignmentEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`teachers/${after.courseId}/assignments`, after)
		await appInstance.listener.created(`teachers/${after.courseId}/assignments/${after.id}`, after)
		await PostsUseCases.add({
			title: after.title,
			description: after.description,
			data: { type: PostType.assignments, assignmentId: after.id },
			courseId: after.courseId,
			members: after.members,
			attachments: after.attachments,
			user: after.user
		})
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated(`teachers/${after.courseId}/assignments`, after)
		await appInstance.listener.updated(`teachers/${after.courseId}/assignments/${after.id}`, after)
		if (changes.title || changes.description || changes.attachments) {
			const { results: posts } = await PostsUseCases.get({
				where: [{ field: 'data.assignmentId', value: after.id }]
			})
			await Promise.all([
				posts.map((post) => PostsUseCases.update({
					id: post.id, userId: post.user.id, courseId: post.courseId,
					data: { title: post.title, description: post.description, attachments: post.attachments }
				}))
			])
		}
		if (changes.attachments) {
			const oldAttachments = before.attachments.filter((t) => !after.attachments.find((a) => a.path === t.path))
			await Promise.all(
				oldAttachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
			)
		}
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`teachers/${before.courseId}/assignments`, before)
		await appInstance.listener.deleted(`teachers/${before.courseId}/assignments/${before.id}`, before)
		await AssignmentSubmissionsUseCases.deleteAssignmentSubmissions(before.id)
		const { results: posts } = await PostsUseCases.get({
			where: [{ field: 'data.assignmentId', value: before.id }]
		})
		await Promise.all([
			posts.map((post) => PostsUseCases.delete({ id: post.id, userId: post.user.id, courseId: post.courseId }))
		])
		await Promise.all(
			before.attachments.map(async (attachment) => await publishers.DELETEFILE.publish(attachment))
		)
	}
}