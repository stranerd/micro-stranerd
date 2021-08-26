import { mongoose } from '@utils/commons'
import { UserFromModel } from '../models'
import { handleUserBioUpdatedEvent, handleUserDeletedEvent } from '../change-streams'

const UserSchema = new mongoose.Schema<UserFromModel>({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: false
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	photo: {
		type: Object,
		required: false
	},
	isVerified: {
		type: Boolean,
		required: true
	},
	authTypes: {
		type: Array,
		required: true
	},
	roles: {
		type: Object,
		required: false,
		default: {}
	},
	lastSignedInAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	signedUpAt: {
		type: Date,
		required: false,
		default: Date.now
	}
})

const User = mongoose.model<UserFromModel>('AuthUser', UserSchema)

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

const userDeletedPipeline = [
	{ $match: { operationType: 'delete' } }
]

handleUserBioUpdatedEvent(User, userBioUpdatedPipeline)
handleUserDeletedEvent(User, userDeletedPipeline)

export default User