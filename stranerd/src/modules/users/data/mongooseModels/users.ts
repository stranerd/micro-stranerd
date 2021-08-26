import { mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'

const UserSchema = new mongoose.Schema<UserFromModel>({
	bio: {
		email: {
			type: String,
			unique: true,
			required: true
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
		}
	},
	dates: {
		signedUpAt: {
			type: Number,
			required: false,
			default: Date.now
		},
		deletedAt: {
			type: Number,
			required: false,
			default: Date.now
		}
	}
})

export const User = mongoose.model<UserFromModel>('User', UserSchema)