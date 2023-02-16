import {
	AssignmentSubmissionsUseCases,
	AssignmentsUseCases,
	AttendancesUseCases,
	CourseEntity,
	CourseFromModel,
	FilesUseCases,
	PostsUseCases
} from '@modules/teachers'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('teachers/courses', after)
		await appInstance.listener.created(`teachers/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('teachers/courses', after)
		await appInstance.listener.updated(`teachers/courses/${after.id}`, after)
		await Promise.all([
			FilesUseCases.updateMembers({ courseId: after.id, members: after.members }),
			AttendancesUseCases.updateMembers({ courseId: after.id, members: after.members }),
			PostsUseCases.updateMembers({ courseId: after.id, members: after.members }),
			AssignmentsUseCases.updateMembers({ courseId: after.id, members: after.members }),
			AssignmentSubmissionsUseCases.updateMembers({ courseId: after.id, members: after.members })
		])
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('teachers/courses', before)
		await appInstance.listener.deleted(`teachers/courses/${before.id}`, before)
		await Promise.all([
			FilesUseCases.deleteCourseFiles(before.id),
			AttendancesUseCases.deleteCourseAttendances(before.id),
			PostsUseCases.deleteCoursePosts(before.id),
			AssignmentsUseCases.deleteCourseAssignments(before.id)
		])
	}
}