import { ChangeStreamCallbacks } from '@utils/commons'
import { ReportEntity, ReportFromModel } from '@modules/reports'
import { getSocketEmitter } from '@index'

export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitAdminCreated('reports', after)
		await getSocketEmitter().emitAdminCreated(`reports/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitAdminUpdated('reports', after)
		await getSocketEmitter().emitAdminUpdated(`reports/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitAdminDeleted('reports', before)
		await getSocketEmitter().emitAdminDeleted(`reports/${before.id}`, before)
	}
}