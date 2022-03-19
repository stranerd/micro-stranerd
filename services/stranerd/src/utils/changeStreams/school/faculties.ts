import { ChangeStreamCallbacks } from '@utils/commons'
import { DeleteFacultyDepartments, FacultyEntity, FacultyFromModel } from '@modules/school'
import { getSocketEmitter } from '@index'

export const FacultyChangeStreamCallbacks: ChangeStreamCallbacks<FacultyFromModel, FacultyEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('school/faculties', after)
		await getSocketEmitter().emitOpenCreated(`school/faculties/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('school/faculties', after)
		await getSocketEmitter().emitOpenUpdated(`school/faculties/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('school/faculties', before)
		await getSocketEmitter().emitOpenDeleted(`school/faculties/${before.id}`, before)

		await DeleteFacultyDepartments.execute(before.id)
	}
}