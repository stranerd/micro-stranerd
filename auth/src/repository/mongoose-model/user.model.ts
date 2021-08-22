import { mongoose } from '@utils/commons'
import { UserModel } from '../../application/domain'

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
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
		type: Date,
		required: false
	},
	signedUpAt: {
		type: Date,
		required: true
	}
})

const User = mongoose.model<UserModel>('User', UserSchema)

module.exports = { User }