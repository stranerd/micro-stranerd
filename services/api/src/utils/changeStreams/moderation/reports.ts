import { ChangeStreamCallbacks } from '@utils/app/package'
import { ReportEntity, ReportFromModel } from '@modules/moderation'
import { getSocketEmitter } from '@index'

export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('moderation/reports', after)
		await getSocketEmitter().emitCreated(`moderation/reports/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('moderation/reports', after)
		await getSocketEmitter().emitUpdated(`moderation/reports/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('moderation/reports', before)
		await getSocketEmitter().emitDeleted(`moderation/reports/${before.id}`, before)
	}
}