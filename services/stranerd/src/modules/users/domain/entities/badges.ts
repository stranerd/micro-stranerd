import { BaseEntity } from '@utils/commons'
import { CountStreakBadgeNames, CountStreakBadges, CountValues, StreakValues } from '../types'
import { ranks, RankTypes } from './ranks'

export class BadgeEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly data: {
		count: Record<CountStreakBadges, { value: number }>
		streak: Record<CountStreakBadges, { value: number, longestStreak: number, lastEvaluatedAt: number }>
	}
	public readonly badges: {
		count: Record<CountStreakBadges, (typeof CountValues)[number]['value'][]>,
		streak: Record<CountStreakBadges, (typeof StreakValues)[number]['value'][]>,
		rank: RankTypes[]
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
			.map((id) => ranks.find((r) => r.id.toLowerCase() === id.toLowerCase()))
			.filter((r) => !!r)
			.map((r) => ({
				name: r!.id,
				key: r!.id.toLowerCase(),
				levelName: r!.id,
				level: r!.level
			}))

		const streakBadges = Object.keys(CountStreakBadges)
			.map((key) => this.badges.streak[key as CountStreakBadges]
				.map((b) => {
					const badge = StreakValues.find((v) => v.value === b)
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
					const badge = CountValues.find((v) => v.value === b)
					if (!badge) return null
					const name = CountStreakBadgeNames[key as CountStreakBadges]
					return {
						name, key,
						levelName: badge.name,
						level: badge.level
					}
				}).filter((r) => !!r)
			).flat(1)

		return { rankBadges, streakBadges, countBadges }
	}

	unlockCountBadge (activity: CountStreakBadges, add: boolean) {
		const amount = add ? 1 : -1
		const value = this.data.count[activity].value
		const clearedLevels = CountValues.filter((v) => (value + amount) >= v.value).map((l) => l.value)
		const oldLevels = this.badges.count[activity].filter((l) => !clearedLevels.includes(l))
		const newLevels = clearedLevels.filter((l) => !this.badges.count[activity].includes(l))
		return { oldLevels, newLevels }
	}

	unlockStreakBadge (activity: CountStreakBadges, add: boolean) {
		const amount = add ? 1 : -1
		const value = this.data.streak[activity].value
		const clearedLevels = StreakValues.filter((v) => (value + amount) >= v.value).map((l) => l.value)
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
	}
	badges: {
		count: Record<CountStreakBadges, (typeof CountValues)[number]['value'][]>,
		streak: Record<CountStreakBadges, (typeof StreakValues)[number]['value'][]>,
		rank: RankTypes[]
	}
	createdAt: number
	updatedAt: number
}
