import { ChangeStreamCallbacks } from '@utils/app/package'
import { CourseEntity, CourseFromModel, PastQuestionsUseCases } from '@modules/school'
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
		await PastQuestionsUseCases.deleteCourseQuestions(before.id)
	}
}