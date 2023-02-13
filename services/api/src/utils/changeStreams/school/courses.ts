import { CourseEntity, CourseFromModel, PastQuestionsUseCases } from '@modules/school'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('school/courses', after)
		await appInstance.socketEmitter.emitCreated(`school/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('school/courses', after)
		await appInstance.socketEmitter.emitUpdated(`school/courses/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('school/courses', before)
		await appInstance.socketEmitter.emitDeleted(`school/courses/${before.id}`, before)
		await PastQuestionsUseCases.deleteCourseQuestions(before.id)
	}
}