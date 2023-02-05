import { ChangeStreamCallbacks } from '@utils/app/package'
import { FileEntity, FileFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'

export const FileChangeStreamCallbacks: ChangeStreamCallbacks<FileFromModel, FileEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/files`, after)
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/files/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/files`, after)
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/files/${after.id}`, after)
		if (changes.media) await publishers.DELETEFILE.publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/files`, before)
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/files/${before.id}`, before)
		await publishers.DELETEFILE.publish(before.media)
	}
}