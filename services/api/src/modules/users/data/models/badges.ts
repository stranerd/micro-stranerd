import { CountStreakBadges, CountValues, StreakValues } from '../../domain/types'
import { RankTypes } from '../../domain/entities/ranks'

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
	},
	badges: {
		count: Record<CountStreakBadges, (typeof CountValues)[number]['value'][]>,
		streak: Record<CountStreakBadges, (typeof StreakValues)[number]['value'][]>,
		rank: RankTypes[]
	}
}