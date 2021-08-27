import { EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'
import { User } from '../mongoose-model/user.model'

const userBioUpdatedPipeline = [
	{
		$match: {
			$or: [
				{ operationType: 'insert' },
				{
					$and: [
						{ operationType: 'update' },
						{
							$or: [
								{ 'updateDescription.updatedFields.firstName': { $exists: true } },
								{ 'updateDescription.updatedFields.lastName': { $exists: true } },
								{ 'updateDescription.updatedFields.email': { $exists: true } },
								{ 'updateDescription.updatedFields.photo': { $exists: true } }
							]
						}
					]
				}
			]
		}
	}
]
User.watch(userBioUpdatedPipeline, { fullDocument: 'updateLookup' })
	.on('change', async (data) => {
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

const userRolesUpdatedPipeline = [
	{
		$match: {
			$and: [
				{ operationType: 'update' },
				{
					$or: [
						{ 'updateDescription.updatedFields.roles': { $exists: true } }
					]
				}
			]
		}
	}
]
User.watch(userRolesUpdatedPipeline, { fullDocument: 'updateLookup' })
	.on('change', async (data) => {
		if (data.operationType === 'update') await publishers[EventTypes.AUTHROLESUPDATED].publish({
			id: data.fullDocument._id,
			data: data.fullDocument.roles,
			timestamp: Date.now()
		})
	})

const userDeletedPipeline = [
	{ $match: { operationType: 'delete' } }
]
User.watch(userDeletedPipeline, { fullDocument: 'updateLookup' })
	.on('change', async (data) => {
		if (data.operationType === 'delete') await publishers[EventTypes.AUTHUSERDELETED].publish({
			id: (data.documentKey._id as string).toString(),
			timestamp: Date.now()
		})
	})