import { appInstance, ChangeStreamCallbacks } from '@utils/commons'
import { BadgeEntity, BadgeFromModel, CountStreakBadges, RankTypes } from '@modules/users'
import { getSocketEmitter } from '@index'

const handleCountBadges = async (activity: CountStreakBadges, newLevels: number[], oldLevels: number[]) => {
	await appInstance.logger.success(activity, newLevels, oldLevels)
}

const handleStreakBadges = async (activity: CountStreakBadges, newLevels: number[], oldLevels: number[]) => {
	await appInstance.logger.success(activity, newLevels, oldLevels)
}

const handleRankBadges = async (newLevels: RankTypes[], oldLevels: RankTypes[]) => {
	await appInstance.logger.success(newLevels, oldLevels)
}

export const BadgeChangeStreamCallbacks: ChangeStreamCallbacks<BadgeFromModel, BadgeEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated(`users/badges/${after.userId}`, after)
		await getSocketEmitter().emitCreated(`users/badges/${after.id}/${after.userId}`, after)

		const funcs = [] as (() => Promise<void>)[]

		const keys = Object.keys(CountStreakBadges)
		keys.forEach((key) => {
			const countBadges = after.badges.count[key as CountStreakBadges]
			const streakBadges = after.badges.streak[key as CountStreakBadges]
			funcs.push(() => handleCountBadges(key as CountStreakBadges, countBadges, []))
			funcs.push(() => handleStreakBadges(key as CountStreakBadges, streakBadges, []))
		})

		funcs.push(() => handleRankBadges(after.badges.rank, []))

		await Promise.all(funcs.map(async (func) => await func()))
	},
	updated: async ({ after, before }) => {
		await getSocketEmitter().emitUpdated(`users/badges/${after.userId}`, after)
		await getSocketEmitter().emitUpdated(`users/badges/${after.id}/${after.userId}`, after)

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

		await Promise.all(funcs.map(async (func) => await func()))
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted(`users/badges/${before.userId}`, before)
		await getSocketEmitter().emitDeleted(`users/badges/${before.id}/${before.userId}`, before)

		const funcs = [] as (() => Promise<void>)[]

		const keys = Object.keys(CountStreakBadges)
		keys.forEach((key) => {
			const countBadges = before.badges.count[key as CountStreakBadges]
			const streakBadges = before.badges.streak[key as CountStreakBadges]
			funcs.push(() => handleCountBadges(key as CountStreakBadges, [], countBadges))
			funcs.push(() => handleStreakBadges(key as CountStreakBadges, [], streakBadges))
		})

		funcs.push(() => handleRankBadges([], before.badges.rank))

		await Promise.all(funcs.map(async (func) => await func()))
	}
}