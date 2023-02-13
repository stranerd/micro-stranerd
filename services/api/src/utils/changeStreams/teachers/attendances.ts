import { AttendanceEntity, AttendanceFromModel } from '@modules/teachers'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const AttendanceChangeStreamCallbacks: ChangeStreamCallbacks<AttendanceFromModel, AttendanceEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated(`teachers/${after.courseId}/attendances`, after)
		await appInstance.socketEmitter.emitCreated(`teachers/${after.courseId}/attendances/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated(`teachers/${after.courseId}/attendances`, after)
		await appInstance.socketEmitter.emitUpdated(`teachers/${after.courseId}/attendances/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted(`teachers/${before.courseId}/attendances`, before)
		await appInstance.socketEmitter.emitDeleted(`teachers/${before.courseId}/attendances/${before.id}`, before)
	}
}