import { generateChangeStreams, mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { UserChangeStreamCallbacks } from '@utils/changeStreams/users/users'
import { UserEntity } from '@modules/users/domain/entities/users'
import { UserMapper } from '@modules/users/data/mappers/users'

const UserMeta = {
	questionsCount: {
		type: Number,
		required: false,
		default: 0
	},
	answersCount: {
		type: Number,
		required: false,
		default: 0
	},
	answerCommentsCount: {
		type: Number,
		required: false,
		default: 0
	}
}

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
		score: {
			type: Number,
			required: false,
			default: 0
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
		meta: UserMeta,
		ratings: {
			type: Object,
			required: false,
			default: { count: 0, total: 0 }
		}
	}
})

UserSchema.index({ 'bio.firstName': 'text', 'bio.lastName': 'text' })

export const User = mongoose.model<UserFromModel>('StranerdUser', UserSchema)

generateChangeStreams<UserFromModel, UserEntity>(User, UserChangeStreamCallbacks, new UserMapper().mapFrom).then()