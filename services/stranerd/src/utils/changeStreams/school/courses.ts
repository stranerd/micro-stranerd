import { ChangeStreamCallbacks } from '@utils/commons'
import { CourseEntity, CourseFromModel } from '@modules/school'
import { getSocketEmitter } from '@index'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('school/courses', after)
		await getSocketEmitter().emitOpenCreated(`school/courses/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('school/courses', after)
		await getSocketEmitter().emitOpenUpdated(`school/courses/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('school/courses', before)
		await getSocketEmitter().emitOpenDeleted(`school/courses/${before.id}`, before)
	}
}