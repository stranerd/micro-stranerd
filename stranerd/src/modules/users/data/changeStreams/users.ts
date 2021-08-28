import { User } from '../mongooseModels/users'
import { publishers } from '@utils/events'
import { EventTypes } from '@utils/commons'

export const setupChangeStreams = () => {
	const userUpdatedPipeline = [{ $match: { operationType: 'update' } }]
	User.watch(userUpdatedPipeline, { fullDocument: 'updateLookup' })
		.on('change', async (data) => {
			if (data.operationType === 'update') {
				const updatedFields = Object.keys(data.updateDescription.updatedFields)
				const updatedBio = updatedFields.some((k) => k.includes('bio'))
				if (updatedBio) await publishers[EventTypes.STRANERDUSERBIOUPDATED].publish({
					id: data.fullDocument._id,
					data: data.fullDocument.bio,
					timestamp: Date.now()
				})
			}
		})
}