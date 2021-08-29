import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserFromModel } from '@modules/repository/models'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel> = {
	created: async (data) => {
		await publishers[EventTypes.AUTHUSERCREATED].publish({
			id: data._id,
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				photo: data.photo
			},
			timestamp: data.signedUpAt
		})
	},
	updated: async (data, fields) => {
		const updatedBio = !!fields.firstName || !!fields.lastName || !!fields.email || !!fields.photo
		if (updatedBio) await publishers[EventTypes.AUTHUSERUPDATED].publish({
			id: data._id,
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				photo: data.photo
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
	deleted: async (data) => {
		await publishers[EventTypes.AUTHUSERDELETED].publish({
			id: data._id,
			timestamp: Date.now()
		})
	}
}