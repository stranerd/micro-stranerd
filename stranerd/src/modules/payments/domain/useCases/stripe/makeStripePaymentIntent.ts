import { BaseUseCase } from '@utils/commons'
import { IStripeRepository } from '../../i-repositories/stripe'
import { SupportedCurrencies } from '../../types'

type Input = { amount: number, currency: SupportedCurrencies }

export class MakeStripePaymentIntentUseCase implements BaseUseCase<Input, { id: string, clientSecret: string }> {
	repository: IStripeRepository

	constructor (repo: IStripeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.makePaymentIntent(input.amount, input.currency)
	}
}