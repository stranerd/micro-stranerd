import { ChangeStreamCallbacks } from '@utils/commons'
import { DepartmentEntity, DepartmentFromModel } from '@modules/school'
import { getSocketEmitter } from '@index'

export const DepartmentChangeStreamCallbacks: ChangeStreamCallbacks<DepartmentFromModel, DepartmentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('school/departments', after)
		await getSocketEmitter().emitOpenCreated(`school/departments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('school/departments', after)
		await getSocketEmitter().emitOpenUpdated(`school/departments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('school/departments', before)
		await getSocketEmitter().emitOpenDeleted(`school/departments/${before.id}`, before)
	}
}