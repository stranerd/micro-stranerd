import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { UserDbChangeCallbacks } from '@utils/changeStreams/users/users'
import { UserEntity } from '../../domain/entities/users'
import { UserMeta, UserRankings } from '../../domain/types'
import { UserMapper } from '../mappers/users'
import { UserFromModel } from '../models/users'

const Meta = Object.fromEntries(
	Object.keys(UserMeta).map((key) => [key, {
		type: Number,
		required: false,
		default: 0
	}])
)

const Rankings = Object.fromEntries(
	Object.keys(UserRankings).map((key) => [key, {
		value: {
			type: Number,
			required: false,
			default: 0
		},
		lastUpdatedAt: {
			type: Number,
			required: false,
			default: Date.now()
		}
	}])
)

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
	account: {
		score: {
			type: Number,
			required: false,
			default: 0
		},
		rankings: Rankings,
		meta: Meta,
		streak: UserStreak
	},
	school: {
		type: mongoose.Schema.Types.Mixed as unknown as UserFromModel['school'],
		required: false,
		default: null
	}
}, { minimize: false })

export const User = mongoose.model<UserFromModel>('StranerdUser', UserSchema)

export const UserChange = appInstance.db
	.generateDbChange<UserFromModel, UserEntity>(User, UserDbChangeCallbacks, new UserMapper().mapFrom)