import { ChangeStreamCallbacks } from '@utils/commons'
import {
	DeleteInstitutionCourses,
	DeleteInstitutionFaculties,
	InstitutionEntity,
	InstitutionFromModel
} from '@modules/school'
import { getSocketEmitter } from '@index'

export const InstitutionChangeStreamCallbacks: ChangeStreamCallbacks<InstitutionFromModel, InstitutionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('school/institutions', after)
		await getSocketEmitter().emitCreated(`school/institutions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('school/institutions', after)
		await getSocketEmitter().emitUpdated(`school/institutions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('school/institutions', before)
		await getSocketEmitter().emitDeleted(`school/institutions/${before.id}`, before)

		await DeleteInstitutionCourses.execute(before.id)
		await DeleteInstitutionFaculties.execute(before.id)
	}
}