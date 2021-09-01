import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserEntity } from '@modules/domain'
import { UserFromModel } from '@modules/repository/models'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await publishers[EventTypes.AUTHUSERCREATED].publish({
			id: after.id,
			data: {
				firstName: after.firstName,
				lastName: after.lastName,
				email: after.email,
				photo: after.photo
			},
			timestamp: after.signedUpAt
		})
	},
	updated: async ({ before, after, changes }) => {
		if (changes.photo && before.photo) await publishers[EventTypes.DELETEFILE].publish(before.photo)

		const updatedBio = changes.firstName || changes.lastName || changes.photo || changes.email

		if (updatedBio) await publishers[EventTypes.AUTHUSERUPDATED].publish({
			id: after.id,
			data: {
				firstName: after.firstName,
				lastName: after.lastName,
				email: after.email,
				photo: after.photo
			},
			timestamp: Date.now()
		})

		const updatedRoles = !!changes.roles
		if (updatedRoles) await publishers[EventTypes.AUTHROLESUPDATED].publish({
			id: after.id,
			data: after.roles,
			timestamp: Date.now()
		})
	},
	deleted: async ({ before }) => {
		await publishers[EventTypes.AUTHUSERDELETED].publish({
			id: before.id,
			timestamp: Date.now()
		})
	}
}