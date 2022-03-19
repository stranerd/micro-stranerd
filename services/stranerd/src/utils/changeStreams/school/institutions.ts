import { ChangeStreamCallbacks } from '@utils/commons'
import { DeleteInstitutionCourses, InstitutionEntity, InstitutionFromModel } from '@modules/school'
import { getSocketEmitter } from '@index'

export const InstitutionChangeStreamCallbacks: ChangeStreamCallbacks<InstitutionFromModel, InstitutionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('study/institutions', after)
		await getSocketEmitter().emitOpenCreated(`study/institutions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('study/institutions', after)
		await getSocketEmitter().emitOpenUpdated(`study/institutions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('study/institutions', before)
		await getSocketEmitter().emitOpenDeleted(`study/institutions/${before.id}`, before)

		await DeleteInstitutionCourses.execute(before.id)
	}
}