import { FileEntity, FileFromModel } from '@modules/teachers'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const FileDbChangeCallbacks: DbChangeCallbacks<FileFromModel, FileEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created(`teachers/${after.courseId}/files`, after)
		await appInstance.listener.created(`teachers/${after.courseId}/files/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await appInstance.listener.updated(`teachers/${after.courseId}/files`, after)
		await appInstance.listener.updated(`teachers/${after.courseId}/files/${after.id}`, after)
		if (changes.media) await publishers.DELETEFILE.publish(before.media)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted(`teachers/${before.courseId}/files`, before)
		await appInstance.listener.deleted(`teachers/${before.courseId}/files/${before.id}`, before)
		await publishers.DELETEFILE.publish(before.media)
	}
}