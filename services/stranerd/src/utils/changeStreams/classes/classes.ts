import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { ClassEntity, ClassFromModel, UpdateAnnouncementsAdmins, UpdateGroupsAdmins } from '@modules/classes'
import { getSocketEmitter } from '@index'
import { createRootSet } from '@utils/modules/study/sets'
import { SetType } from '@modules/study/domain/types'
import { publishers } from '@utils/events'
import { UpdateQuestionsClassName } from '@modules/questions'
import { UpdateSetsClassName } from '@modules/study'

export const ClassChangeStreamCallbacks: ChangeStreamCallbacks<ClassFromModel, ClassEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('classes/classes', after)
		await getSocketEmitter().emitOpenCreated(`classes/classes/${after.id}`, after)

		await createRootSet(after.userId, after.userBio, after.userRoles, {
			type: SetType.classes,
			classId: after.id,
			className: after.name,
			classAvatar: after.avatar
		})
	},
	updated: async ({ after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('classes/classes', after)
		await getSocketEmitter().emitOpenUpdated(`classes/classes/${after.id}`, after)

		if (changes.name) await Promise.all(
			[UpdateQuestionsClassName, UpdateSetsClassName].map((u) => u.execute({
				classId: after.id,
				className: after.name,
				classAvatar: after.avatar
			}))
		)

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

		if (before.avatar) await publishers[EventTypes.DELETEFILE].publish(before.avatar)
	}
}