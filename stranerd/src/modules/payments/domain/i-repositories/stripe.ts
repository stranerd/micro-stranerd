import { SupportedCurrencies } from '../types'

export interface IStripeRepository {
	makePaymentIntent (amountInCents: number, currency: SupportedCurrencies): Promise<{ id: string, clientSecret: string }>

	confirmPaymentSuccess (id: string): Promise<boolean>
}