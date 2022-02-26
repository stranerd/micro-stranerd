import { ChangeStreamCallbacks } from '@utils/commons'
import { ReportEntity, ReportFromModel } from '@modules/reports'
import { getSocketEmitter } from '@index'

export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitAdminCreated('reports/reports', after)
		await getSocketEmitter().emitAdminCreated(`reports/reports/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitAdminUpdated('reports/reports', after)
		await getSocketEmitter().emitAdminUpdated(`reports/reports/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitAdminDeleted('reports/reports', before)
		await getSocketEmitter().emitAdminDeleted(`reports/reports/${before.id}`, before)
	}
}