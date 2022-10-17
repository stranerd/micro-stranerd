import { ChangeStreamCallbacks } from '@utils/app/package'
import { AttendancesUseCases, CourseEntity, CourseFromModel, FilesUseCases } from '@modules/teachers'
import { getSocketEmitter } from '@index'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('teachers/courses', after)
		await getSocketEmitter().emitCreated(`teachers/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('teachers/courses', after)
		await getSocketEmitter().emitUpdated(`teachers/courses/${after.id}`, after)
		await Promise.all([
			FilesUseCases.updateMembers({ courseId: after.id, members: after.members }),
			AttendancesUseCases.updateMembers({ courseId: after.id, members: after.members })
		])
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('teachers/courses', before)
		await getSocketEmitter().emitDeleted(`teachers/courses/${before.id}`, before)
		await Promise.all([
			FilesUseCases.deleteCourseFiles(before.id),
			AttendancesUseCases.deleteCourseAttendances(before.id)
		])
	}
}