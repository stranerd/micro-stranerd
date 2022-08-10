import { BadgeEntity } from '../entities/badges'
import { CountStreakBadges } from '../types'
import { RankTypes } from '../entities/ranks'

export interface IBadgeRepository {
	get (userId: string): Promise<BadgeEntity>

	recordRank (userId: string, rank: RankTypes, add: boolean): Promise<void>

	recordCountStreak (userId: string, activity: CountStreakBadges, add: boolean): Promise<void>
}