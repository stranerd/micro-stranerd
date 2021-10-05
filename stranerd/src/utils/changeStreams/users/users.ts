import { ChangeStreamCallbacks } from '@utils/commons'
import { CoinBadges, RecordCoin, RecordRank, UpdateMyReviewsBio, UserEntity, UserFromModel } from '@modules/users'
import { UpdateAnswerCommentsUserBio, UpdateAnswersUserBio, UpdateQuestionsUserBio } from '@modules/questions'
import { UpdateChatMetaUserBios, UpdateMySessionsBio } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { addUserCoins } from '@utils/modules/users/transactions'
import { getSocketEmitter } from '@index'

export const UserChangeStreamCallbacks: ChangeStreamCallbacks<UserFromModel, UserEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('users', after)
		await getSocketEmitter().emitOpenCreated(`users/${after.id}`, after)
		await addUserCoins(after.id, { gold: 10, bronze: 100 }, 'Congrats for signing up to Stranerd')
	},
	updated: async ({ before, after, changes }) => {
		await getSocketEmitter().emitOpenUpdated('users', after)
		await getSocketEmitter().emitOpenUpdated(`users/${after.id}`, after)
		const updatedBio = !!changes.bio
		if (updatedBio) {
			await UpdateQuestionsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswersUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateAnswerCommentsUserBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateChatMetaUserBios.execute({ userId: after.id, userBio: after.bio })
			await UpdateMySessionsBio.execute({ userId: after.id, userBio: after.bio })
			await UpdateMyReviewsBio.execute({ userId: after.id, userBio: after.bio })
		}

		const updatedScore = !!changes.account?.score
		if (updatedScore && after.rank.id !== before.rank.id) {
			const increased = after.account.score > before.account.score
			if (increased) {
				await sendNotification(after.id, {
					body: `Congrats, you just got promoted to ${after.rank.id}`,
					action: 'account',
					data: { profile: true }
				})
				await RecordRank.execute({
					userId: after.id,
					rank: after.rank.level,
					add: true
				})
			} else {
				await sendNotification(after.id, {
					body: `Oops, you just got demoted to ${after.rank.id}`,
					action: 'account',
					data: { profile: true }
				})
				await RecordRank.execute({
					userId: after.id,
					rank: before.rank.level,
					add: false
				})
				await RecordRank.execute({
					userId: after.id,
					rank: after.rank.level,
					add: true
				})
			}
		}

		const updatedCoins = !!changes.account?.coins
		if (updatedCoins) {
			const spentGold = before.account.coins.gold - after.account.coins.gold
			const spentBronze = before.account.coins.bronze - after.account.coins.bronze
			if (spentGold > 0) await RecordCoin.execute({
				userId: after.id,
				activity: CoinBadges.SpendGold,
				amount: spentGold
			})
			if (spentBronze > 0) await RecordCoin.execute({
				userId: after.id,
				activity: CoinBadges.SpendBronze,
				amount: spentBronze
			})
		}
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('users', before)
		await getSocketEmitter().emitOpenDeleted(`users/${before.id}`, before)
	}
}