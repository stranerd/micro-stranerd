import { ChangeStreamCallbacks } from '@utils/commons'
import { CourseEntity, CourseFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('courses', after)
		await getSocketEmitter().emitOpenCreated(`courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('courses', after)
		await getSocketEmitter().emitOpenUpdated(`courses/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('courses', before)
		await getSocketEmitter().emitOpenDeleted(`courses/${before.id}`, before)
	}
}