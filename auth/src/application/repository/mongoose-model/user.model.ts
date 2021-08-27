import { mongoose } from '@utils/commons'
import { UserFromModel } from '../models'
import { handleUserBioUpdatedEvent, handleUserDeletedEvent, handleUserRoleUpdatedEvent } from '../change-streams'

const UserSchema = new mongoose.Schema<UserFromModel>({
	email: {
		type: String,
		set: (email: string) => email.toLowerCase(),
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: false,
		default: ''
	},
	firstName: {
		type: String,
		set: (name: string) => name.toLowerCase(),
		required: true
	},
	lastName: {
		type: String,
		set: (name: string) => name.toLowerCase(),
		required: true
	},
	photo: {
		type: Object,
		required: false,
		default: null
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
		set: (types: string[]) => Array.from(new Set(types)),
		required: false,
		default: {}
	},
	lastSignedInAt: {
		type: Date,
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

const userDeletedPipeline = [
	{ $match: { operationType: 'delete' } }
]

handleUserBioUpdatedEvent(User, userBioUpdatedPipeline)
handleUserRoleUpdatedEvent(User, userRolesUpdatedPipeline)
handleUserDeletedEvent(User, userDeletedPipeline)

export default User