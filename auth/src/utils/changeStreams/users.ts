import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserEntity } from '@modules/domain'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserEntity> = {
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
	updated: async ({ before, after }) => {
		const updatedBio = before.firstName !== after.firstName
			|| before.lastName !== after.lastName
			|| before.photo !== after.photo

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

		const updatedRoles = !!fields.roles
		if (updatedRoles) await publishers[EventTypes.AUTHROLESUPDATED].publish({
			id: data._id,
			data: data.roles,
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