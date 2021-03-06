import { generateChangeStreams, mongoose } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { UserChangeStreamCallbacks } from '@utils/changeStreams/users/users'
import { UserEntity } from '../../domain/entities/users'
import { UserMapper } from '../mappers/users'
import { UserMeta, UserRankings } from '../../domain/types'

const Meta = Object.fromEntries(
	Object.keys(UserMeta).map((key) => [key, {
		type: Number,
		required: false,
		default: 0
	}])
)

const Rankings = Object.fromEntries(
	Object.keys(UserRankings).map((key) => [key, {
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
		default: () => new mongoose.Types.ObjectId().toString()
	},
	bio: {
		type: mongoose.Schema.Types.Mixed as unknown as UserFromModel['bio'],
		required: true
	},
	roles: {
		type: mongoose.Schema.Types.Mixed as unknown as UserFromModel['roles'],
		required: false,
		default: {} as unknown as UserFromModel['roles']
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
		currentSessions: {
			type: [String],
			required: false,
			default: []
		},
		currentTutorSessions: {
			type: [String],
			required: false,
			default: []
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
		rankings: Rankings,
		meta: Meta,
		ratings: UserRating,
		streak: UserStreak
	},
	school: {
		type: mongoose.Schema.Types.Mixed as unknown as UserFromModel['school'],
		required: false,
		default: null
	}
}, { minimize: false })

export const User = mongoose.model<UserFromModel>('StranerdUser', UserSchema)

generateChangeStreams<UserFromModel, UserEntity>(User, UserChangeStreamCallbacks, new UserMapper().mapFrom).then()