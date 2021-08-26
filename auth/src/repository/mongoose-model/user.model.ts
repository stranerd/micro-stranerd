import { mongoose } from '@utils/commons'
import { UserFromModel } from '../models'
import { monitorUserEvent } from '../change-streams'

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

const pipelineInsertUser = [
	{
		'$match': {
			'operationType': 'insert',
		}
	}
]

const pipelineUpdateUser = [
	{
		'$match': {
			'operationType': 'update'
		}
	}
]

// monitor user insert 
monitorUserEvent(User,pipelineInsertUser,'insert')

// monitor user update
monitorUserEvent(User,pipelineUpdateUser,'update')


export default User