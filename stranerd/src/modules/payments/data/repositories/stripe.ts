import { IStripeRepository } from '../../domain/i-repositories/stripe'
import Stripe from 'stripe'
import { stripeSecret } from '@utils/environment'

export class StripeRepository implements IStripeRepository {
	private static instance: StripeRepository

	static getInstance (): StripeRepository {
		if (!StripeRepository.instance) StripeRepository.instance = new StripeRepository()
		return StripeRepository.instance
	}
	

	async makePaymentIntent (amount: number, currency: 'usd' | 'ngn') {

		const stripe = new Stripe(stripeSecret, {
			apiVersion: '2020-08-27'
		})

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency
		  })

		return paymentIntent.client_secret
	}

	
}