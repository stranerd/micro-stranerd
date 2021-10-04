import { BaseEntity } from '@utils/commons'
import { CoinBadges, CoinValues, CountStreakBadges, CountValues, StreakValues } from '../types'

export class BadgeEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly data: {
		count: Record<CountStreakBadges, { value: number }>
		streak: Record<CountStreakBadges, { value: number, longestStreak: number, lastEvaluatedAt: number }>
		coin: Record<CoinBadges, { value: number }>
	}
	public readonly badges: {
		count: Record<CountStreakBadges, (typeof CountValues)[number]['level'][]>,
		streak: Record<CountStreakBadges, (typeof StreakValues)[number]['level'][]>,
		coin: Record<CoinBadges, (typeof CoinValues)[number]['level'][]>
	}
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, data, badges, userId, createdAt, updatedAt }: BadgeConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.badges = badges
		this.userId = userId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type BadgeConstructorArgs = {
	id: string
	userId: string
	data: {
		count: Record<CountStreakBadges, { value: number }>
		streak: Record<CountStreakBadges, { value: number, longestStreak: number, lastEvaluatedAt: number }>
		coin: Record<CoinBadges, { value: number }>
	}
	badges: {
		count: Record<CountStreakBadges, (typeof CountValues)[number]['level'][]>,
		streak: Record<CountStreakBadges, (typeof StreakValues)[number]['level'][]>,
		coin: Record<CoinBadges, (typeof CoinValues)[number]['level'][]>
	}
	createdAt: number
	updatedAt: number
}
