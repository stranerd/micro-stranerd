import { mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { setupChangeStreams } from '../changeStreams/users'

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
	tutor: {
		strongestSubject: {
			type: String,
			required: false,
			default: null
		},
		weakerSubjects: {
			type: Array,
			required: false,
			default: []
		}
	},
	dates: {
		createdAt: {
			type: Number,
			required: false,
			default: Date.now
		},
		deletedAt: {
			type: Number,
			required: false,
			default: null
		}
	},
	status: {
		connections: {
			type: Object,
			required: false,
			default: {}
		},
		lastUpdatedAt: {
			type: Number,
			required: false,
			default: 0
		}
	},
	account: {
		rank: {
			type: Number,
			required: false,
			default: 1
		},
		coins: {
			gold: {
				type: Number,
				required: false,
				default: 0
			},
			bronze: {
				type: Number,
				required: false,
				default: 0
			}
		},
		meta: {
			type: Object,
			required: false,
			default: {}
		},
		ratings: {
			type: Object,
			required: false,
			default: { count: 0, total: 0 }
		}
	}
})

export const User = mongoose.model<UserFromModel>('User', UserSchema)

setupChangeStreams()