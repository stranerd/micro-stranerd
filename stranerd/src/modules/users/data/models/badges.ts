import { CoinBadges, CoinValues, CountStreakBadges, CountValues, StreakValues } from '../../domain/types'

export interface BadgeFromModel extends BadgeToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface BadgeToModel {
	userId: string
	data: {
		count: Record<CountStreakBadges, { value: number }>
		streak: Record<CountStreakBadges, { value: number, longestStreak: number, lastEvaluatedAt: number }>
		coin: Record<CoinBadges, { value: number }>
	},
	badges: {
		count: Record<CountStreakBadges, (typeof CountValues)[number]['level'][]>,
		streak: Record<CountStreakBadges, (typeof StreakValues)[number]['level'][]>,
		coin: Record<CoinBadges, (typeof CoinValues)[number]['level'][]>
	}
}