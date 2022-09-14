import { ChangeStreamCallbacks } from '@utils/app/package'
import { CoursesUseCases, DepartmentEntity, DepartmentFromModel } from '@modules/school'
import { getSocketEmitter } from '@index'

export const DepartmentChangeStreamCallbacks: ChangeStreamCallbacks<DepartmentFromModel, DepartmentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('school/departments', after)
		await getSocketEmitter().emitCreated(`school/departments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('school/departments', after)
		await getSocketEmitter().emitUpdated(`school/departments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('school/departments', before)
		await getSocketEmitter().emitDeleted(`school/departments/${before.id}`, before)

		await CoursesUseCases.deleteDepartmentCourses(before.id)
	}
}