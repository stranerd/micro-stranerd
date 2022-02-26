import { ChangeStreamCallbacks } from '@utils/commons'
import { ClassEntity, ClassFromModel, UpdateAnnouncementsAdmins, UpdateGroupsAdmins } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const ClassChangeStreamCallbacks: ChangeStreamCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/classes', after)
		await getSocketEmitter().emitOpenCreated(`classes/classes/${after.id}`, after)
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('classes/classes', after)
		await getSocketEmitter().emitOpenUpdated(`classes/classes/${after.id}`, after)

		if (changes.users?.admins) await Promise.all(
			[UpdateAnnouncementsAdmins, UpdateGroupsAdmins].map((u) => u.execute({
				classId: after.id,
				admins: after.getAllAdmins()
			}))
		)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('classes/classes', before)
		await getSocketEmitter().emitOpenDeleted(`classes/classes/${before.id}`, before)
	}
}