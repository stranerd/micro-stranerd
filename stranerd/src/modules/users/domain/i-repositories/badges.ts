import { BadgeEntity } from '../entities/badges'
import { QueryParams, QueryResults } from '@utils/commons'
import { CoinBadges, CountStreakBadges } from '../types'

export interface IBadgeRepository {
	findBadge (userId: string): Promise<BadgeEntity | null>

	getBadges (query: QueryParams): Promise<QueryResults<BadgeEntity>>

	recordRank (userId: string, rank: number, add: boolean): Promise<void>

	recordSpendCoin (userId: string, activity: CoinBadges, amount: number): Promise<void>

	recordCountStreak (userId: string, activity: CountStreakBadges, add: boolean): Promise<void>
}