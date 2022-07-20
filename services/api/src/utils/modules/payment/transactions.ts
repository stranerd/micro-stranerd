import {
	CardsUseCases,
	TransactionEntity,
	TransactionStatus,
	TransactionsUseCases,
	TransactionType
} from '@modules/payment'
import { FlutterwavePayment } from '@utils/modules/payment/flutterwave'

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
		await TransactionsUseCases.update({
			id: transaction.id,
			data: { status: TransactionStatus.settled }
		})
	}
}