import { BaseUseCase } from '@utils/commons'
import { IStripeRepository } from '../../i-repositories/stripe'

type Input  = {amount: number, currency: 'usd' | 'ngn'}

export class MakeStripePaymentIntentUseCase implements BaseUseCase<Input, string | null> {
	repository: IStripeRepository

	constructor (repo: IStripeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.makePaymentIntent(input.amount, input.currency)
	}
}