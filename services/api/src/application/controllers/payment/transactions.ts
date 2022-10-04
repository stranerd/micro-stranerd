import { Currencies, TransactionStatus, TransactionsUseCases, TransactionType } from '@modules/payment'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/app/package'
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
		const types = [TransactionType.NewCard]
		const authUser = req.authUser!

		const { type } = validate({
			type: req.body.data?.type
		}, {
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(types, (cur, val) => cur === val)]
			}
		})

		const dynamics = { title: '', amount: 0 }

		if (isNewCardType) {
			dynamics.title = 'Test charge on new card'
			dynamics.amount = 50
		}

		return await TransactionsUseCases.create({
			...dynamics, currency: Currencies.NGN, userId: authUser.id, email: authUser.email,
			status: TransactionStatus.initialized, data: isNewCardType ? { type } : ({} as any)
		})
	}

	static async fulfill (req: Request) {
		const transaction = await TransactionsUseCases.find({ id: req.params.id, userId: req.authUser!.id })
		if (!transaction) throw new NotAuthorizedError()
		const successful = await FlutterwavePayment.verify(transaction.id, transaction.amount, transaction.currency)
		if (!successful) throw new BadRequestError('transaction unsuccessful')
		return await TransactionsUseCases.update({
			id: transaction.id,
			data: { status: TransactionStatus.fulfilled }
		})
	}
}