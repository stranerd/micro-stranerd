import { DepartmentsUseCases, FacultyEntity, FacultyFromModel } from '@modules/school'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const FacultyDbChangeCallbacks: DbChangeCallbacks<FacultyFromModel, FacultyEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('school/faculties', after)
		await appInstance.listener.created(`school/faculties/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('school/faculties', after)
		await appInstance.listener.updated(`school/faculties/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('school/faculties', before)
		await appInstance.listener.deleted(`school/faculties/${before.id}`, before)

		await DepartmentsUseCases.deleteFacultyDepartments(before.id)
	}
}