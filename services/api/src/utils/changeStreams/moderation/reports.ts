import { ReportEntity, ReportFromModel } from '@modules/moderation'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const ReportDbChangeCallbacks: DbChangeCallbacks<ReportFromModel, ReportEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('moderation/reports', after)
		await appInstance.listener.created(`moderation/reports/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('moderation/reports', after)
		await appInstance.listener.updated(`moderation/reports/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('moderation/reports', before)
		await appInstance.listener.deleted(`moderation/reports/${before.id}`, before)
	}
}