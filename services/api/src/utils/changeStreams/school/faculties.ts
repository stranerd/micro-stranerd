import { DepartmentsUseCases, FacultyEntity, FacultyFromModel } from '@modules/school'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const FacultyChangeStreamCallbacks: ChangeStreamCallbacks<FacultyFromModel, FacultyEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('school/faculties', after)
		await appInstance.socketEmitter.emitCreated(`school/faculties/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('school/faculties', after)
		await appInstance.socketEmitter.emitUpdated(`school/faculties/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('school/faculties', before)
		await appInstance.socketEmitter.emitDeleted(`school/faculties/${before.id}`, before)

		await DepartmentsUseCases.deleteFacultyDepartments(before.id)
	}
}