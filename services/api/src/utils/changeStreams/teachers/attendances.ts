import { ChangeStreamCallbacks } from '@utils/app/package'
import { AttendanceEntity, AttendanceFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'

export const AttendanceChangeStreamCallbacks: ChangeStreamCallbacks<AttendanceFromModel, AttendanceEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/attendances/${after.courseId}`, after)
		await getSocketEmitter().emitCreated(`teachers/attendances/${after.courseId}/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`teachers/attendances/${after.courseId}`, after)
		await getSocketEmitter().emitUpdated(`teachers/attendances/${after.courseId}/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/attendances/${before.courseId}`, before)
		await getSocketEmitter().emitDeleted(`teachers/attendances/${before.courseId}/${before.id}`, before)
	}
}