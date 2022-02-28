import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ClassEntity, ClassFromModel, UpdateAnnouncementsUsers, UpdateGroupsUsers } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { publishers } from '@utils/events'
import { UpdateQuestionsClassName } from '@modules/questions'
import { UpdateSetsClassName } from '@modules/study'

export const ClassChangeStreamCallbacks: ChangeStreamCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/classes', after)
		await getSocketEmitter().emitOpenCreated(`classes/classes/${after.id}`, after)
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('classes/classes', after)
		await getSocketEmitter().emitOpenUpdated(`classes/classes/${after.id}`, after)

		if (changes.name || changes.avatar) await Promise.all(
			[UpdateQuestionsClassName, UpdateSetsClassName].map((u) => u.execute({
				classId: after.id,
				className: after.name,
				classAvatar: after.avatar
			}))
		)

		if (changes.users) await Promise.all(
			[UpdateAnnouncementsUsers, UpdateGroupsUsers].map((u) => u.execute({
				classId: after.id,
				users: after.users
			}))
		)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('classes/classes', before)
		await getSocketEmitter().emitOpenDeleted(`classes/classes/${before.id}`, before)

		if (before.avatar) await publishers[EventTypes.DELETEFILE].publish(before.avatar)
	}
}