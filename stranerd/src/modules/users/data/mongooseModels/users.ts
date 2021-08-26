import { mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'

const UserSchema = new mongoose.Schema<UserFromModel>({
	bio: {
		type: Object,
		required: true
	},
	roles: {
		type: Object,
		required: false,
		default: {}
	},
	dates: {
		createdAt: {
			type: Date,
			required: false,
			default: Date.now
		},
		deletedAt: {
			type: Date,
			required: false,
			default: Date.now
		}
	}
})

export const User = mongoose.model<UserFromModel>('User', UserSchema)