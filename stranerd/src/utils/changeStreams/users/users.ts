import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserFromModel } from '@modules/users/data/models/users'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel> = {
	updated: async (data, fields) => {
		const updatedBio = !!fields.bio
		if (updatedBio) await publishers[EventTypes.STRANERDUSERBIOUPDATED].publish({
			id: data._id,
			data: data.bio,
			timestamp: Date.now()
		})
	}
}