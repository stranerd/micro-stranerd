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

	unlockCoinBadge (coin: 'gold' | 'bronze', amount: number) {
		const key = coin === 'gold' ? CoinBadges.SpendGold : CoinBadges.SpendBronze
		const value = this.data.coin[key].value
		const clearedLevels = CoinValues.filter((v) => (value + amount) >= v.value).map((l) => l.level)
		const oldLevels = this.badges.coin[key].filter((l) => !clearedLevels.includes(l))
		const newLevels = clearedLevels.filter((l) => !this.badges.coin[key].includes(l))
		return { oldLevels, newLevels }
	}

	unlockCountBadge (activity: CountStreakBadges, add: boolean) {
		const amount = add ? 1 : -1
		const value = this.data.count[activity].value
		const clearedLevels = CountValues.filter((v) => (value + amount) >= v.value).map((l) => l.level)
		const oldLevels = this.badges.count[activity].filter((l) => !clearedLevels.includes(l))
		const newLevels = clearedLevels.filter((l) => !this.badges.count[activity].includes(l))
		return { oldLevels, newLevels }
	}

	unlockStreakBadge (activity: CountStreakBadges, add: boolean) {
		const amount = add ? 1 : -1
		const value = this.data.streak[activity].value
		const clearedLevels = StreakValues.filter((v) => (value + amount) >= v.value).map((l) => l.level)
		const oldLevels = this.badges.streak[activity].filter((l) => !clearedLevels.includes(l))
		const newLevels = clearedLevels.filter((l) => !this.badges.streak[activity].includes(l))
		return { oldLevels, newLevels }
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
