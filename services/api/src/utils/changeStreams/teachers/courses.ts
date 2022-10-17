import { ChangeStreamCallbacks } from '@utils/app/package'
import { CourseEntity, CourseFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('teachers/courses', after)
		await getSocketEmitter().emitCreated(`teachers/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('teachers/courses', after)
		await getSocketEmitter().emitUpdated(`teachers/courses/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('teachers/courses', before)
		await getSocketEmitter().emitDeleted(`teachers/courses/${before.id}`, before)
	}
}