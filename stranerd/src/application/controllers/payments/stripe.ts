import { MakeStripePaymentIntent } from '@modules/payments'
import { CreatePayment, MarkPaymentAsComplete } from '@modules/payments'
import { NotAuthorizedError, Request } from '@utils/commons'

export class StripeController {

	static async makeIntent (req: Request) {
		const paymentInfo = {
			amount: req.body.payment,
			currency: req.body.currency
		}

		const paymentIntent = await MakeStripePaymentIntent.execute(paymentInfo)
		
		if(paymentIntent) {

			const newPayment = await CreatePayment.execute({
				amount: req.body.amount,
				isGold:  req.body.isGold,
				userId:  req.authUser!.id,
				type: 'stripe'
			})
			return {
				paymentId: newPayment.id,
				paymentIntent
			}
		}

		// this should through an error
		return false
		
       
	}


	static async verifyPayment (req: Request) {
		
		const payment = await MarkPaymentAsComplete.execute(req.body.paymentId)
		
		if(payment) return  {
			success: true
		}

		// this should through an error
		throw new NotAuthorizedError()
		
       
	}
	
}