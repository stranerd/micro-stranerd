import {
	CardsUseCases,
	Currencies,
	TransactionEntity,
	TransactionStatus,
	TransactionsUseCases,
	TransactionType,
	WalletsUseCases
} from '@modules/payment'
import { FlutterwavePayment } from '@utils/modules/payment/flutterwave'
import { Conditions } from '@utils/commons'

export const fulfillTransaction = async (transaction: TransactionEntity) => {
	if (transaction.data.type === TransactionType.NewCard) {
		const fTransaction = await FlutterwavePayment.getTransactionByRef(transaction.id)
		if (!fTransaction) return
		const [month, year] = fTransaction.card.expiry.split('/').map((x) => parseInt(x))
		await CardsUseCases.create({
			userId: transaction.userId,
			email: transaction.email,
			first6Digits: fTransaction.card.first_6digits,
			last4Digits: fTransaction.card.last_4digits,
			issuer: fTransaction.card.issuer,
			country: fTransaction.card.country,
			type: fTransaction.card.type,
			token: fTransaction.card.token,
			expiredAt: new Date(year, month).getTime()
		})
		await WalletsUseCases.updateAmount({
			userId: transaction.userId,
			amount: await FlutterwavePayment.convertAmount(transaction.amount, transaction.currency, Currencies.NGN)
		})
		await TransactionsUseCases.update({
			id: transaction.id,
			data: { status: TransactionStatus.settled }
		})
	}
}

export const retryTransactions = async () => {
	const { results: transactions } = await TransactionsUseCases.get({
		where: [{ field: 'status', value: TransactionStatus.fulfilled },
			{ field: 'createdAt', condition: Conditions.lt, value: Date.now() - (60 * 60 * 1000) }],
		all: true
	})
	await Promise.all(transactions.map(fulfillTransaction))
}