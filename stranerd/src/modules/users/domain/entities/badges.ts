import { BaseEntity } from '@utils/commons'
import {
	CoinBadgeNames,
	CoinBadges,
	CoinValues,
	CountStreakBadgeNames,
	CountStreakBadges,
	CountValues,
	StreakValues
} from '../types'
import { ranks } from './ranks'

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
		rank: number[]
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

	get allBadges () {
		const rankBadges = this.badges.rank
			.map((level) => ranks.find((r) => r.level === level))
			.filter((r) => !!r)
			.map((r) => ({
				name: r!.id,
				key: r!.id.toLowerCase(),
				levelName: r!.id,
				level: r!.level
			}))

		const coinBadges = Object.keys(CoinBadges)
			.map((key) => this.badges.coin[key as CoinBadges]
				.map((b) => {
					const badge = CoinValues.find((v) => v.level === b)
					if (!badge) return null
					const name = CoinBadgeNames[key as CoinBadges]
					return {
						name, key,
						levelName: badge.name,
						level: badge.level
					}
				}).filter((r) => !!r)
			).flat(1)

		const streakBadges = Object.keys(CountStreakBadges)
			.map((key) => this.badges.streak[key as CountStreakBadges]
				.map((b) => {
					const badge = StreakValues.find((v) => v.level === b)
					if (!badge) return null
					const name = CountStreakBadgeNames[key as CountStreakBadges]
					return {
						name, key,
						levelName: badge.name,
						level: badge.level
					}
				}).filter((r) => !!r)
			).flat(1)

		const countBadges = Object.keys(CountStreakBadges)
			.map((key) => this.badges.count[key as CountStreakBadges]
				.map((b) => {
					const badge = CountValues.find((v) => v.level === b)
					if (!badge) return null
					const name = CountStreakBadgeNames[key as CountStreakBadges]
					return {
						name, key,
						levelName: badge.name,
						level: badge.level
					}
				}).filter((r) => !!r)
			).flat(1)

		return { rankBadges, coinBadges, streakBadges, countBadges }
	}

	unlockCoinBadge (activity: CoinBadges, amount: number) {
		const value = this.data.coin[activity].value
		const clearedLevels = CoinValues.filter((v) => (value + amount) >= v.value).map((l) => l.level)
		const oldLevels = this.badges.coin[activity].filter((l) => !clearedLevels.includes(l))
		const newLevels = clearedLevels.filter((l) => !this.badges.coin[activity].includes(l))
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
		rank: number[]
	}
	createdAt: number
	updatedAt: number
}
