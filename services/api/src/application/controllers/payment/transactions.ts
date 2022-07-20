import { Currencies, TransactionStatus, TransactionsUseCases, TransactionType } from '@modules/payment'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { FlutterwavePayment } from '@utils/modules/payment/flutterwave'
import { flutterwaveConfig } from '@utils/environment'

export class TransactionsController {
	static async getSecrets (_: Request) {
		return { publicKey: flutterwaveConfig.publicKey }
	}

	static async find (req: Request) {
		return await TransactionsUseCases.find({ id: req.params.id, userId: req.authUser!.id })
	}

	static async get (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await TransactionsUseCases.get(query)
	}

	static async create (req: Request) {
		const isNewCardType = req.body.data?.type === TransactionType.NewCard
		const authUser = req.authUser!

		const { amount, type } = validate({
			amount: isNewCardType ? 50 : req.body.amount,
			type: req.body.data?.type
		}, {
			amount: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(TransactionType), (cur, val) => cur === val)]
			}
		})

		return await TransactionsUseCases.create({
			amount, currency: Currencies.NGN, userId: authUser.id, email: authUser.email,
			status: TransactionStatus.initialized, data: { type }
		})
	}

	static async fulfill (req: Request) {
		const transactionId = req.params.id
		const transaction = await TransactionsUseCases.find({ id: transactionId, userId: req.authUser!.id })
		const fTransaction = await FlutterwavePayment.getTransactionByRef(transactionId)
		if (!transaction || !fTransaction) throw new NotAuthorizedError()
		if (transaction.currency !== fTransaction.currency || transaction.amount !== fTransaction.amount) throw new BadRequestError('tampered transaction')
		if (fTransaction.status !== 'successful') throw new BadRequestError('transaction was unsuccessful')
		return await TransactionsUseCases.update({
			id: transactionId,
			data: {
				status: TransactionStatus.fulfilled
			}
		})
	}
}