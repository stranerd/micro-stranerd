import { generateChangeStreams, mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { UserChangeStreamCallbacks } from '@utils/changeStreams/users/users'
import { UserEntity } from '../../domain/entities/users'
import { UserMapper } from '../mappers/users'
import { UserAccount } from '../../domain/types'

const metaKeys: (keyof UserAccount['meta'])[] = ['questions', 'answers', 'answerComments', 'sessions', 'tutorSessions']
const UserMeta = Object.fromEntries(
	metaKeys.map((key) => [key, {
		type: Number,
		required: false,
		default: 0
	}])
)

const UserRating = {
	count: {
		type: Number,
		required: false,
		default: 0
	},
	total: {
		type: Number,
		required: false,
		default: 0
	}
}

const UserStreak = {
	count: {
		type: Number,
		required: false,
		default: 0
	},
	longestStreak: {
		type: Number,
		required: false,
		default: 0
	},
	lastEvaluatedAt: {
		type: Number,
		required: false,
		default: 0
	}
}

const UserSchema = new mongoose.Schema<UserFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
	bio: {
		type: Object as unknown as UserFromModel['bio'],
		required: true
	},
	roles: {
		type: Object as unknown as UserFromModel['roles'],
		required: false,
		default: {} as unknown as UserFromModel['roles']
	},
	tutor: {
		strongestSubject: {
			type: String,
			required: false,
			default: null
		},
		weakerSubjects: {
			type: [String],
			required: false,
			default: []
		},
		tags: {
			type: Object,
			required: false,
			default: {}
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
			type: [String],
			required: false,
			default: []
		},
		lastUpdatedAt: {
			type: Number,
			required: false,
			default: 0
		}
	},
	session: {
		currentSession: {
			type: String,
			required: false,
			default: null
		},
		currentTutorSession: {
			type: String,
			required: false,
			default: null
		},
		requests: {
			type: [String],
			required: false,
			default: []
		},
		lobby: {
			type: [String],
			required: false,
			default: []
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
		ratings: UserRating,
		streak: UserStreak
	}
})

UserSchema.index({ 'bio.firstName': 'text', 'bio.lastName': 'text' })

export const User = mongoose.model<UserFromModel>('StranerdUser', UserSchema)

generateChangeStreams<UserFromModel, UserEntity>(User, UserChangeStreamCallbacks, new UserMapper().mapFrom).then()