import { CoursesUseCases, DepartmentEntity, DepartmentFromModel } from '@modules/school'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const DepartmentDbChangeCallbacks: DbChangeCallbacks<DepartmentFromModel, DepartmentEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('school/departments', after)
		await appInstance.listener.created(`school/departments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('school/departments', after)
		await appInstance.listener.updated(`school/departments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('school/departments', before)
		await appInstance.listener.deleted(`school/departments/${before.id}`, before)

		await CoursesUseCases.deleteDepartmentCourses(before.id)
	}
}