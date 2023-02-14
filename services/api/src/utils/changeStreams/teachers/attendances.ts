import { AttendanceEntity, AttendanceFromModel } from '@modules/teachers'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const AttendanceChangeStreamCallbacks: ChangeStreamCallbacks<AttendanceFromModel, AttendanceEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`teachers/${after.courseId}/attendances`, after)
		await appInstance.listener.created(`teachers/${after.courseId}/attendances/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated(`teachers/${after.courseId}/attendances`, after)
		await appInstance.listener.updated(`teachers/${after.courseId}/attendances/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`teachers/${before.courseId}/attendances`, before)
		await appInstance.listener.deleted(`teachers/${before.courseId}/attendances/${before.id}`, before)
	}
}