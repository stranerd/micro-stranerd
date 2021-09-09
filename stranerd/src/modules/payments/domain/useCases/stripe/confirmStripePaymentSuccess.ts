import { BaseUseCase } from '@utils/commons'
import { IStripeRepository } from '../../i-repositories/stripe'

export class ConfirmStripePaymentSuccessUseCase implements BaseUseCase<string, boolean> {
	repository: IStripeRepository

	constructor (repo: IStripeRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.confirmPaymentSuccess(id)
	}
}