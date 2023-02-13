import { CoursesUseCases, FacultiesUseCases, InstitutionEntity, InstitutionFromModel } from '@modules/school'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const InstitutionChangeStreamCallbacks: ChangeStreamCallbacks<InstitutionFromModel, InstitutionEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('school/institutions', after)
		await appInstance.socketEmitter.emitCreated(`school/institutions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('school/institutions', after)
		await appInstance.socketEmitter.emitUpdated(`school/institutions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('school/institutions', before)
		await appInstance.socketEmitter.emitDeleted(`school/institutions/${before.id}`, before)

		await CoursesUseCases.deleteInstitutionCourses(before.id)
		await FacultiesUseCases.deleteInstitutionFaculties(before.id)
	}
}