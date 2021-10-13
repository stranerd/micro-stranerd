import { AddUserCoins, CreateTransaction } from '@modules/users'

export const addUserCoins = async (userId: string, coins: { bronze: number, gold: number }, transaction: string) => {
	await AddUserCoins.execute({
		id: userId,
		coins
	})

	if (transaction && coins.gold) await CreateTransaction.execute({
		amount: coins.gold,
		event: transaction,
		isGold: true,
		userId
	})
	if (transaction && coins.bronze) await CreateTransaction.execute({
		amount: coins.bronze,
		event: transaction,
		isGold: false,
		userId
	})
}