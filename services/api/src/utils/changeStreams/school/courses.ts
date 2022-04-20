import { ChangeStreamCallbacks } from '@utils/commons'
import { CourseEntity, CourseFromModel, DeleteCourseQuestions } from '@modules/school'
import { getSocketEmitter } from '@index'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('school/courses', after)
		await getSocketEmitter().emitCreated(`school/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('school/courses', after)
		await getSocketEmitter().emitUpdated(`school/courses/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('school/courses', before)
		await getSocketEmitter().emitDeleted(`school/courses/${before.id}`, before)
		await DeleteCourseQuestions.execute(before.id)
	}
}