import { CoursesUseCases, DepartmentEntity, DepartmentFromModel } from '@modules/school'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const DepartmentChangeStreamCallbacks: ChangeStreamCallbacks<DepartmentFromModel, DepartmentEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('school/departments', after)
		await appInstance.socketEmitter.emitCreated(`school/departments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('school/departments', after)
		await appInstance.socketEmitter.emitUpdated(`school/departments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('school/departments', before)
		await appInstance.socketEmitter.emitDeleted(`school/departments/${before.id}`, before)

		await CoursesUseCases.deleteDepartmentCourses(before.id)
	}
}