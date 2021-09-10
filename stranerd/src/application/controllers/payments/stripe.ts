import {
	ConfirmStripePaymentSuccess,
	CreatePayment,
	MakeStripePaymentIntent,
	MarkPaymentAsComplete,
	PaymentType,
	SupportedCurrencies,
	SupportedMethods
} from '@modules/payments'
import { NotAuthorizedError, Request, validate, Validation } from '@utils/commons'
import { BadRequestError } from '@stranerd/api-commons'

export class StripeController {
	static async buyCoins (req: Request) {
		const data = validate({
			amount: req.body.amount,
			currency: req.body.currency,
			gold: req.body.gold,
			bronze: req.body.bronze
		}, {
			amount: { required: true, rules: [Validation.isNumber] },
			gold: { required: true, rules: [Validation.isNumber] },
			bronze: { required: true, rules: [Validation.isNumber] },
			currency: {
				required: true,
				rules: [Validation.arrayContainsX(Object.values<string>(SupportedCurrencies), (cur, val) => cur === val)]
			}
		})

		const paymentIntent = await MakeStripePaymentIntent.execute({ amount: data.amount, currency: data.currency })

		if (!paymentIntent.id || !paymentIntent.clientSecret) throw new BadRequestError('Failed to create payment with stripe')

		await CreatePayment.execute({
			amount: data.amount,
			currency: data.currency,
			method: SupportedMethods.stripe,
			type: PaymentType.BuyCoins,
			userId: req.authUser!.id,
			data: { gold: data.gold, bronze: data.bronze },
			intent: paymentIntent.id
		})

		return paymentIntent
	}

	static async verifyPayment (req: Request) {
		const data = validate({
			intentId: req.body.intentId
		}, {
			intentId: { required: true, rules: [Validation.isString] }
		})

		const paymentSuccessful = await ConfirmStripePaymentSuccess.execute(data.intentId)
		if (!paymentSuccessful) throw new BadRequestError('Payment not successful')

		const success = await MarkPaymentAsComplete.execute({
			intent: data.intentId,
			userId: req.authUser!.id
		})

		if (success) return success
		throw new NotAuthorizedError()
	}
}