import { ChangeStreamCallbacks } from '@utils/app/package'
import { AttendanceEntity, AttendanceFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'

export const AttendanceChangeStreamCallbacks: ChangeStreamCallbacks<AttendanceFromModel, AttendanceEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/attendances`, after)
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/attendances/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/attendances`, after)
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/attendances/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/attendances`, before)
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/attendances/${before.id}`, before)
	}
}