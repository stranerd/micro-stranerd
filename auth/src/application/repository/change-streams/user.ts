import { EventTypes, mongoose } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserFromModel } from '../models'

export const monitorUserEvent = (collection: mongoose.Model<UserFromModel>, pipeline = [{}]) => {

	const changeStream = collection.watch(pipeline, { fullDocument: 'updateLookup' })

	changeStream.on('change', async (data) => {
		if (data.operationType === 'insert') await publishers[EventTypes.AUTHUSERCREATED].publish({
			id: data.fullDocument._id,
			data: {
				firstName: data.fullDocument.firstName,
				lastName: data.fullDocument.lastName,
				email: data.fullDocument.email,
				photo: data.fullDocument.photo
			}
		})
		if (data.operationType === 'update') await publishers[EventTypes.AUTHUSERUPDATED].publish({
			id: data.fullDocument._id,
			data: {
				firstName: data.fullDocument.firstName,
				lastName: data.fullDocument.lastName,
				email: data.fullDocument.email,
				photo: data.fullDocument.photo
			}
		})

	})
}