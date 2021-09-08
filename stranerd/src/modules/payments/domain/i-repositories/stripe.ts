export interface IStripeRepository {

	makePaymentIntent (amount: number, currency: 'usd' | 'ngn'): Promise<string | null>

}