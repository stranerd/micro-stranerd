import { CoursesUseCases, FacultiesUseCases, InstitutionEntity, InstitutionFromModel } from '@modules/school'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const InstitutionDbChangeCallbacks: DbChangeCallbacks<InstitutionFromModel, InstitutionEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('school/institutions', after)
		await appInstance.listener.created(`school/institutions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('school/institutions', after)
		await appInstance.listener.updated(`school/institutions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('school/institutions', before)
		await appInstance.listener.deleted(`school/institutions/${before.id}`, before)

		await CoursesUseCases.deleteInstitutionCourses(before.id)
		await FacultiesUseCases.deleteInstitutionFaculties(before.id)
	}
}