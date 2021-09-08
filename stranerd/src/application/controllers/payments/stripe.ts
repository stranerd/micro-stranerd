import { MakeStripePaymentIntent } from '@modules/payments'
import { CreateTransaction, MarkTransactionAsComplete } from '@modules/users'
import { NotAuthorizedError, Request } from '@utils/commons'

export class StripeController {

	static async makeIntent (req: Request) {
		const paymentInfo = {
			amount: req.body.payment,
			currency: req.body.currency
		}

		const paymentIntent = await MakeStripePaymentIntent.execute(paymentInfo)
		
		if(paymentIntent) {

			const newTransaction = await CreateTransaction.execute({
				amount: req.body.amount,
				event:  req.body.event,
				isGold:  req.body.isGold,
				userId:  req.authUser!.id
			})
			return {
				transactionId: newTransaction.id,
				paymentIntent
			}
		}

		// this should through an error
		return false
		
       
	}


	static async verifyPayment (req: Request) {
		
		const transaction = await MarkTransactionAsComplete.execute(req.body.transactionId)
		
		if(transaction) return  {
			success: true
		}

		// this should through an error
		throw new NotAuthorizedError()
		
       
	}
	
}