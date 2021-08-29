import { EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { User } from '../mongooseModels/user.model'

export const setupChangeStreams = () => {
	const userCreatedPipeline = [{ $match: { operationType: 'insert' } }]
	User.watch(userCreatedPipeline, { fullDocument: 'updateLookup' })
		.on('change', async (data) => {
			if (data.operationType === 'insert') await publishers[EventTypes.AUTHUSERCREATED].publish({
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

	const userUpdatedPipeline = [{ $match: { operationType: 'update' } }]
	User.watch(userUpdatedPipeline, { fullDocument: 'updateLookup' })
		.on('change', async (data) => {
			if (data.operationType === 'update') {
				const updatedFields = Object.keys(data.updateDescription.updatedFields)
				const updatedBio = updatedFields
					.some((k) => k.includes('firstName') || k.includes('lastName') || k.includes('email') || k.includes('photo'))
				if (updatedBio) await publishers[EventTypes.AUTHUSERUPDATED].publish({
					id: data.fullDocument._id,
					data: {
						firstName: data.fullDocument.firstName,
						lastName: data.fullDocument.lastName,
						email: data.fullDocument.email,
						photo: data.fullDocument.photo
					},
					timestamp: Date.now()
				})

				const updatedRoles = updatedFields.some((k) => k.includes('roles'))
				if (updatedRoles) await publishers[EventTypes.AUTHROLESUPDATED].publish({
					id: data.fullDocument._id,
					data: data.fullDocument.roles,
					timestamp: Date.now()
				})
			}
		})

	const userDeletedPipeline = [{ $match: { operationType: 'delete' } }]
	User.watch(userDeletedPipeline, { fullDocument: 'updateLookup' })
		.on('change', async (data) => {
			if (data.operationType === 'delete') await publishers[EventTypes.AUTHUSERDELETED].publish({
				id: (data.documentKey._id as string).toString(),
				timestamp: Date.now()
			})
		})
}