import { ChangeStreamCallbacks } from '@utils/commons'
import { BadgeEntity, BadgeFromModel, CountStreakBadges } from '@modules/users'
import { getSocketEmitter } from '@index'

const handleCountBadges = async (activity: CountStreakBadges, newLevels: number[], oldLevels: number[]) => {
	console.log(activity, newLevels, oldLevels)
}

const handleStreakBadges = async (activity: CountStreakBadges, newLevels: number[], oldLevels: number[]) => {
	console.log(activity, newLevels, oldLevels)
}

const handleCoinBadges = async (coin: 'gold' | 'bronze', newLevels: number[], oldLevels: number[]) => {
	console.log(coin, newLevels, oldLevels)
}

const handleRankBadges = async (newLevels: number[], oldLevels: number[]) => {
	console.log(newLevels, oldLevels)
}

export const BadgeChangeStreamCallbacks: ChangeStreamCallbacks<BadgeFromModel, BadgeEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitMineCreated('badges', after, after.userId)
		await getSocketEmitter().emitMineCreated(`badges/${after.id}`, after, after.userId)

		const funcs = [] as (() => Promise<void>)[]

		const keys = Object.keys(CountStreakBadges)
		keys.forEach((key) => {
			const countBadges = after.badges.count[key as CountStreakBadges]
			const streakBadges = after.badges.streak[key as CountStreakBadges]
			funcs.push(() => handleCountBadges(key as CountStreakBadges, countBadges, []))
			funcs.push(() => handleStreakBadges(key as CountStreakBadges, streakBadges, []))
		})

		funcs.push(() => handleRankBadges(after.badges.rank, []))
		funcs.push(() => handleCoinBadges('bronze', after.badges.coin.SpendBronze, []))
		funcs.push(() => handleCoinBadges('gold', after.badges.coin.SpendGold, []))

		await Promise.all(funcs.map(async (func) => await func()))
	},
	updated: async ({ after, before }) => {
		await getSocketEmitter().emitMineUpdated('badges', after, after.userId)
		await getSocketEmitter().emitMineUpdated(`badges/${after.id}`, after, after.userId)

		const funcs = [] as (() => Promise<void>)[]

		const keys = Object.keys(CountStreakBadges)
		keys.forEach((key) => {
			const oldCountBadges = before.badges.count[key as CountStreakBadges].filter((level) => !after.badges.count[key as CountStreakBadges].includes(level))
			const newCountBadges = after.badges.count[key as CountStreakBadges].filter((level) => !before.badges.count[key as CountStreakBadges].includes(level))
			funcs.push(() => handleCountBadges(key as CountStreakBadges, newCountBadges, oldCountBadges))

			const oldStreakBadges = before.badges.streak[key as CountStreakBadges].filter((level) => !after.badges.streak[key as CountStreakBadges].includes(level))
			const newStreakBadges = after.badges.streak[key as CountStreakBadges].filter((level) => !before.badges.streak[key as CountStreakBadges].includes(level))
			funcs.push(() => handleStreakBadges(key as CountStreakBadges, newStreakBadges, oldStreakBadges))
		})

		const newRankBadges = after.badges.rank.filter((level) => !before.badges.rank.includes(level))
		const oldRankBadges = before.badges.rank.filter((level) => !after.badges.rank.includes(level))
		funcs.push(() => handleRankBadges(newRankBadges, oldRankBadges))

		const newBronzeBadges = after.badges.coin.SpendBronze.filter((level) => !before.badges.coin.SpendBronze.includes(level))
		const oldBronzeBadges = before.badges.coin.SpendBronze.filter((level) => !after.badges.coin.SpendBronze.includes(level))
		funcs.push(() => handleCoinBadges('bronze', newBronzeBadges, oldBronzeBadges))

		const newGoldBadges = after.badges.coin.SpendGold.filter((level) => !before.badges.coin.SpendGold.includes(level))
		const oldGoldBadges = before.badges.coin.SpendGold.filter((level) => !after.badges.coin.SpendGold.includes(level))
		funcs.push(() => handleCoinBadges('gold', newGoldBadges, oldGoldBadges))

		await Promise.all(funcs.map(async (func) => await func()))
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitMineDeleted('badges', before, before.userId)
		await getSocketEmitter().emitMineDeleted(`badges/${before.id}`, before, before.userId)

		const funcs = [] as (() => Promise<void>)[]

		const keys = Object.keys(CountStreakBadges)
		keys.forEach((key) => {
			const countBadges = before.badges.count[key as CountStreakBadges]
			const streakBadges = before.badges.streak[key as CountStreakBadges]
			funcs.push(() => handleCountBadges(key as CountStreakBadges, [], countBadges))
			funcs.push(() => handleStreakBadges(key as CountStreakBadges, [], streakBadges))
		})

		funcs.push(() => handleRankBadges([], before.badges.rank))
		funcs.push(() => handleCoinBadges('bronze', [], before.badges.coin.SpendBronze))
		funcs.push(() => handleCoinBadges('gold', [], before.badges.coin.SpendGold))

		await Promise.all(funcs.map(async (func) => await func()))
	}
}