import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { BadgeDbChangeCallbacks } from '@utils/changeStreams/users/badges'
import { BadgeEntity } from '../../domain/entities/badges'
import { CountStreakBadges } from '../../domain/types'
import { BadgeMapper } from '../mappers/badges'
import { BadgeFromModel } from '../models/badges'

const data = {
	count: Object.fromEntries(
		Object.keys(CountStreakBadges).map((key) => {
			return [key, {
				value: {
					type: Number,
					required: false,
					default: 0
				}
			}]
		})
	),
	streak: Object.fromEntries(
		Object.keys(CountStreakBadges).map((key) => {
			return [key, {
				value: {
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
			}]
		})
	)
}

const badges = {
	count: Object.fromEntries(
		Object.keys(CountStreakBadges).map((key) => {
			return [key, {
				type: [Number],
				required: false,
				default: []
			}]
		})
	),
	streak: Object.fromEntries(
		Object.keys(CountStreakBadges).map((key) => {
			return [key, {
				type: [Number],
				required: false,
				default: []
			}]
		})
	),
	rank: {
		type: [String],
		required: false,
		default: []
	}
}

const BadgeSchema = new mongoose.Schema<BadgeFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	data,
	badges,
	userId: {
		type: String,
		required: true
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Badge = mongoose.model<BadgeFromModel>('StranerdUsersBadge', BadgeSchema)

export const BadgeChange = appInstance.db
	.generateDbChange<BadgeFromModel, BadgeEntity>(Badge, BadgeDbChangeCallbacks, new BadgeMapper().mapFrom)