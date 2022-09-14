import { IBadgeRepository } from '../../domain/irepositories/badges'
import { BadgeMapper } from '../mappers/badges'
import { Badge } from '../mongooseModels/badges'
import { mongoose } from '@utils/app/package'
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

	async get (userId: string) {
		const badge = await Badge.findOneAndUpdate({ userId }, { $setOnInsert: { userId } }, {
			new: true,
			upsert: true
		})
		return this.mapper.mapFrom(badge)!
	}

	async recordRank (userId: string, rank: RankTypes, add: boolean) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			const badge = await this.get(userId)

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
			const badge = await this.get(userId)
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