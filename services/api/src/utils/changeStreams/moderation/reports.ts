import { ReportEntity, ReportFromModel } from '@modules/moderation'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('moderation/reports', after)
		await appInstance.socketEmitter.emitCreated(`moderation/reports/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('moderation/reports', after)
		await appInstance.socketEmitter.emitUpdated(`moderation/reports/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('moderation/reports', before)
		await appInstance.socketEmitter.emitDeleted(`moderation/reports/${before.id}`, before)
	}
}