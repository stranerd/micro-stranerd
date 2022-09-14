import { ChangeStreamCallbacks } from '@utils/app/package'
import { DepartmentsUseCases, FacultyEntity, FacultyFromModel } from '@modules/school'
import { getSocketEmitter } from '@index'

export const FacultyChangeStreamCallbacks: ChangeStreamCallbacks<FacultyFromModel, FacultyEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('school/faculties', after)
		await getSocketEmitter().emitCreated(`school/faculties/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('school/faculties', after)
		await getSocketEmitter().emitUpdated(`school/faculties/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('school/faculties', before)
		await getSocketEmitter().emitDeleted(`school/faculties/${before.id}`, before)

		await DepartmentsUseCases.deleteFacultyDepartments(before.id)
	}
}