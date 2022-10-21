import { ChangeStreamCallbacks } from '@utils/app/package'
import { AssignmentEntity, AssignmentFromModel } from '@modules/teachers'
import { getSocketEmitter } from '@index'

export const AssignmentChangeStreamCallbacks: ChangeStreamCallbacks<AssignmentFromModel, AssignmentEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/assignments`, after)
		await getSocketEmitter().emitCreated(`teachers/${after.courseId}/assignments/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/assignments`, after)
		await getSocketEmitter().emitUpdated(`teachers/${after.courseId}/assignments/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/assignments`, before)
		await getSocketEmitter().emitDeleted(`teachers/${before.courseId}/assignments/${before.id}`, before)
	}
}