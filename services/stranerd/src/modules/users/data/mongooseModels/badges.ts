import { generateChangeStreams, mongoose } from '@utils/commons'
import { BadgeFromModel } from '../models/badges'
import { BadgeChangeStreamCallbacks } from '@utils/changeStreams/users/badges'
import { BadgeEntity } from '../../domain/entities/badges'
import { BadgeMapper } from '../mappers/badges'
import { CountStreakBadges } from '../../domain/types'

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

export const Badge = mongoose.model<BadgeFromModel>('StranerdBadge', BadgeSchema)

generateChangeStreams<BadgeFromModel, BadgeEntity>(Badge, BadgeChangeStreamCallbacks, new BadgeMapper().mapFrom).then()