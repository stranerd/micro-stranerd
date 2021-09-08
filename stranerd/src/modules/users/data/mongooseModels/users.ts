import { generateChangeStreams, mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { UserChangeStreamCallbacks } from '@utils/changeStreams/users/users'
import { UserEntity } from '../../domain/entities/users'
import { UserMapper } from '../mappers/users'
import { UserAccount } from '../../domain/types/users'

const metaKeys: (keyof UserAccount['meta'])[] = ['questions', 'answers', 'answerComments', 'sessions', 'tutorSessions']
const UserMeta = Object.fromEntries(
	metaKeys.map((key) => [key, {
		type: Number,
		required: false,
		default: 0
	}])
)

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
	session: {
		currentSession: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			default: null
		},
		currentTutorSession: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			default: null
		},
		requests: {
			type: [mongoose.Schema.Types.ObjectId],
			required: false,
			default: []
		},
		lobby: {
			type: [mongoose.Schema.Types.ObjectId],
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