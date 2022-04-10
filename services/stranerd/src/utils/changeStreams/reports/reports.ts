import { ChangeStreamCallbacks } from '@utils/commons'
import { ReportEntity, ReportFromModel } from '@modules/reports'
import { getSocketEmitter } from '@index'

getSocketEmitter().register('reports/reports', getSocketEmitter().quickRegisters.isAdmin)
export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('reports/reports', after)
		await getSocketEmitter().emitCreated(`reports/reports/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('reports/reports', after)
		await getSocketEmitter().emitUpdated(`reports/reports/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('reports/reports', before)
		await getSocketEmitter().emitDeleted(`reports/reports/${before.id}`, before)
	}
}