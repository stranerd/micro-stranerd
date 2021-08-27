import { EventTypes, mongoose } from '@utils/commons'
import { publishers } from '@utils/events'
import { UserFromModel } from '../models'

export const handleUserBioUpdatedEvent = (collection: mongoose.Model<UserFromModel>, pipeline = [{}]) => {
	const changeStream = collection.watch(pipeline, { fullDocument: 'updateLookup' })
	changeStream.on('change', async (data) => {
		if (data.operationType === 'insert' || data.operationType === 'update') await publishers[EventTypes.AUTHUSERCREATED].publish({
			id: data.fullDocument._id,
			data: {
				firstName: data.fullDocument.firstName,
				lastName: data.fullDocument.lastName,
				email: data.fullDocument.email,
				photo: data.fullDocument.photo
			},
			timestamp: data.operationType === 'insert' ? data.fullDocument.signedUpAt : Date.now()
		})
	})
}

export const handleUserRoleUpdatedEvent = (collection: mongoose.Model<UserFromModel>, pipeline = [{}]) => {
	const changeStream = collection.watch(pipeline, { fullDocument: 'updateLookup' })
	changeStream.on('change', async (data) => {
		if (data.operationType === 'update') await publishers[EventTypes.AUTHROLESUPDATED].publish({
			id: data.fullDocument._id,
			data: data.fullDocument.roles,
			timestamp: Date.now()
		})
	})
}

export const handleUserDeletedEvent = (collection: mongoose.Model<UserFromModel>, pipeline = [{}]) => {
	const changeStream = collection.watch(pipeline, { fullDocument: 'updateLookup' })
	changeStream.on('change', async (data) => {
		if (data.operationType === 'delete') await publishers[EventTypes.AUTHUSERDELETED].publish({
			id: data.documentKey._id.toString(),
			timestamp: Date.now()
		})
	})
}