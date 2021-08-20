import { mongoose } from '@utils/commons'

const userRoles = {
	stranerd: {
		isAdmin: false,
		isModerator: false
	},
	tutorStack: {
		isAdmin: false,
		isModerator: false
	},
	brainBox: {
		isAdmin: false,
		isModerator: false
	}
}

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: true
	},
	photoUrl: {
		type: String,
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
		default: userRoles
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

const User = mongoose.model('User', UserSchema)

module.exports = { User }