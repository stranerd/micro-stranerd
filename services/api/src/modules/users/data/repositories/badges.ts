import { IBadgeRepository } from '../../domain/irepositories/badges'
import { BadgeMapper } from '../mappers/badges'
import { Badge } from '../mongooseModels/badges'
import { mongoose, parseQueryParams, QueryParams } from '@utils/commons'
import { BadgeFromModel } from '../models/badges'
import { CountStreakBadges } from '../../domain/types'
import { getDateDifference } from '@utils/functions'
import { RankTypes } from '../../domain/entities/ranks'

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

	async recordRank (userId: string, rank: RankTypes, add: boolean) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			const badgeModel = await Badge.findOneAndUpdate(
				{ _id: userId, userId },
				{ $setOnInsert: { _id: userId, userId } },
				{ session, upsert: true, new: true }
			)
			const badge = this.mapper.mapFrom(badgeModel)!

			const updateData = {
				[add ? '$addToSet' : '$pull']: { ['badges.rank']: rank }
			}

			await Badge.findByIdAndUpdate(badge.id, updateData, { session })
		})
		await session.endSession()
	}

	async recordCountStreak (userId: string, activity: CountStreakBadges, add: boolean) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			const badgeModel = await Badge.findOneAndUpdate(
				{ _id: userId, userId },
				{ $setOnInsert: { _id: userId, userId } },
				{ session, upsert: true, new: true }
			)
			const badge = this.mapper.mapFrom(badgeModel)!
			const countLevels = badge.unlockCountBadge(activity, add)
			const streakLevels = badge.unlockStreakBadge(activity, add)

			const updateData = { $set: {}, $inc: {}, $addToSet: {}, $pull: {} }

			if (add) {
				updateData.$inc[`data.count.${activity}.value`] = 1
				updateData.$addToSet[`badges.count.${activity}`] = { $each: countLevels.newLevels }

				const { lastEvaluatedAt = 0, value = 0, longestStreak = 0 } = badge.data.streak[activity] ?? {}
				const { isLessThan, isNextDay } = getDateDifference(new Date(lastEvaluatedAt), new Date())

				const skip = isLessThan
				const increase = !isLessThan && isNextDay

				if (!skip) {
					updateData.$set[`data.streak.${activity}.value`] = increase ? value + 1 : 1
					if (increase && value + 1 > longestStreak) {
						updateData.$set[`data.streak.${activity}.longestStreak`] = value + 1
						updateData.$addToSet[`badges.streak.${activity}`] = { $each: streakLevels.newLevels }
					}
					updateData.$set[`data.streak.${activity}.lastEvaluatedAt`] = Date.now()
				}
			} else {
				updateData.$inc[`data.count.${activity}.value`] = -1
				updateData.$pull[`badges.count.${activity}`] = { $in: countLevels.oldLevels }
			}
			await Badge.findByIdAndUpdate(badge.id, updateData, { session })
		})
		await session.endSession()
	}
}