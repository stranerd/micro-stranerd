import { IStripeRepository } from '../../domain/i-repositories/stripe'
import Stripe from 'stripe'
import { stripeConfig } from '@utils/environment'
import { SupportedCurrencies } from '../../domain/types'

export class StripeRepository implements IStripeRepository {
	private static instance: StripeRepository
	private stripe: Stripe

	private constructor () {
		this.stripe = new Stripe(stripeConfig.secretKey, {
			apiVersion: '2020-08-27'
		})
	}

	static getInstance (): StripeRepository {
		if (!StripeRepository.instance) StripeRepository.instance = new StripeRepository()
		return StripeRepository.instance
	}

	async makePaymentIntent (amountInCents: number, currency: SupportedCurrencies) {
		const paymentIntent = await this.stripe.paymentIntents.create({
			amount: amountInCents * 100, currency,
			payment_method_types: ['card']
		})

		return {
			id: paymentIntent.id,
			clientSecret: paymentIntent.client_secret!
		}
	}

	async confirmPaymentSuccess (id: string) {
		const paymentIntent = await this.stripe.paymentIntents.retrieve(id)
		return paymentIntent?.status === 'succeeded'
	}
}