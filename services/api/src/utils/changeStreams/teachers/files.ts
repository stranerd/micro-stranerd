import { ChangeStreamCallbacks } from '@utils/app/package'
import { FileEntity, FileFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { EventTypes } from '@utils/app/types'

export const FileChangeStreamCallbacks: ChangeStreamCallbacks<FileFromModel, FileEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/files/${after.courseId}`, after)
		await getSocketEmitter().emitCreated(`teachers/files/${after.courseId}/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitUpdated(`teachers/files/${after.courseId}`, after)
		await getSocketEmitter().emitUpdated(`teachers/files/${after.courseId}/${after.id}`, after)
		if (changes.media) await publishers[EventTypes.DELETEFILE].publish(before.media)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/files/${before.courseId}`, before)
		await getSocketEmitter().emitDeleted(`teachers/files/${before.courseId}/${before.id}`, before)
		await publishers[EventTypes.DELETEFILE].publish(before.media)
	}
}