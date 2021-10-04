import { IBadgeRepository } from '../../domain/i-repositories/badges'
import { BadgeMapper } from '../mappers/badges'
import { Badge } from '../mongooseModels/badges'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { BadgeFromModel } from '../models/badges'
import { CountStreakBadges } from '../../domain/types'
import { getDateDifference } from '@utils/functions'

export class BadgeRepository implements IBadgeRepository {
	private static instance: BadgeRepository
	private mapper = new BadgeMapper()

	static getInstance (): BadgeRepository {
		if (!BadgeRepository.instance) BadgeRepository.instance = new BadgeRepository()
		return BadgeRepository.instance
	}

	async getBadges (query: QueryParams) {
		const data = await parseQueryParams<BadgeFromModel>(Badge, query)
		return {
			...data,
			results: data.results.map((n) => this.mapper.mapFrom(n)!)
		}
	}

	async findBadge (userId: string) {
		const badge = await Badge.findOne({ userId })
		return this.mapper.mapFrom(badge)
	}

	async recordSpendCoin (userId: string, coin: 'gold' | 'bronze', amount: number) {
		await Badge.findOneAndUpdate({ userId }, {
			$inc: {
				[`data.coin.${coin === 'gold' ? 'SpendGold' : 'SpendBronze'}`]: amount
			}
		}, { upsert: true })
	}

	async recordCountStreak (userId: string, activity: CountStreakBadges, add: boolean) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			const badgeModel = await Badge.findOneAndUpdate(
				{ userId },
				{ $set: { userId } },
				{ session, upsert: true, new: true }
			)
			const badge = this.mapper.mapFrom(badgeModel)!

			const updateData = { $set: {}, $inc: {} }

			if (add) {
				updateData.$inc[`data.count.${activity}.value`] = 1

				const { lastEvaluatedAt = 0, value = 0, longestStreak = 0 } = badge.data.streak[activity] ?? {}
				const { isLessThan, isNextDay } = getDateDifference(new Date(lastEvaluatedAt), new Date())

				const skip = isLessThan
				const increase = !isLessThan && isNextDay

				if (!skip) {
					if (increase) updateData.$inc[`data.streak.${activity}.value`] = 1
					if (increase && value === longestStreak) updateData.$inc[`data.streak.${activity}.longestStreak`] = 1
					updateData.$set[`data.streak.${activity}.lastEvaluatedAt`] = Date.now()
				}
			} else updateData.$inc[`data.count.${activity}.value`] = -1
			await Badge.findByIdAndUpdate(badge.id, updateData, { session })
		})
		await session.endSession()
	}
}