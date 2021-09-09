import { generateChangeStreams, mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { UserChangeStreamCallbacks } from '@utils/changeStreams/users'
import { UserEntity } from '../../domain/entities/users'
import { UserMapper } from '../mappers/users'

const UserSchema = new mongoose.Schema<UserFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
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
		trim: true,
		lowercase: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		lowercase: true,
		required: true
	},
	photo: {
		type: Object,
		required: false,
		default: null
	},
	referrer: {
		type: String,
		required: false,
		default: null as unknown as string
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
		type: Object as unknown as UserFromModel['roles'],
		required: false,
		default: {} as unknown as UserFromModel['roles']
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