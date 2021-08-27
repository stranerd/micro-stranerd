import { User } from '../mongooseModels/users'
import { publishers } from '@utils/events'
import { EventTypes } from '@utils/commons'

const userBioUpdatedPipeline = [
	{
		$match: {
			$and: [
				{ operationType: 'update' },
				{ 'updateDescription.updatedFields.bio': { $exists: true } }
			]
		}
	}
]
User.watch(userBioUpdatedPipeline, { fullDocument: 'updateLookup' })
	.on('change', async (data) => {
		if (data.operationType === 'update') await publishers[EventTypes.STRANERDUSERBIOUPDATED].publish({
			id: data.fullDocument._id,
			data: data.fullDocument.bio,
			timestamp: Date.now()
		})
	})