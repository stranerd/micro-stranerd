import { mongoose } from '@utils/commons'
import { UserModel } from '../../application/domain'

const UserSchema = new mongoose.Schema<UserModel>({
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

export const User = mongoose.model<UserModel>('User', UserSchema)