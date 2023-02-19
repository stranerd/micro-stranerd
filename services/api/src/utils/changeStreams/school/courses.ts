import { CourseEntity, CourseFromModel, PastQuestionsUseCases } from '@modules/school'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const CourseDbChangeCallbacks: DbChangeCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('school/courses', after)
		await appInstance.listener.created(`school/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('school/courses', after)
		await appInstance.listener.updated(`school/courses/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('school/courses', before)
		await appInstance.listener.deleted(`school/courses/${before.id}`, before)
		await PastQuestionsUseCases.deleteCourseQuestions(before.id)
	}
}