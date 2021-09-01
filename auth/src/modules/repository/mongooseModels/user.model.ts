import { generateChangeStreams, mongoose } from '@utils/commons'
import { UserFromModel } from '../models'
import { UserChangeStreamCallbacks } from '@utils/changeStreams/users'
import { UserEntity } from '@modules/domain'
import { UserMapper } from '@modules/repository/mapper/user.mapper'

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
		required: false,
		default: false
	},
	authTypes: {
		type: [String],
		set: (types: string[]) => Array.from(new Set(types)),
		required: false,
		default: []
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
		type: Number,
		required: false,
		default: Date.now
	}
})

export const User = mongoose.model<UserFromModel>('AuthUser', UserSchema)

generateChangeStreams<UserFromModel, UserEntity>(User, UserChangeStreamCallbacks, new UserMapper().mapFrom).then()

export default User