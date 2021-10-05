import { BaseUseCase } from '@utils/commons'
import { IBadgeRepository } from '../../i-repositories/badges'

type Input = { userId: string, coin: 'gold' | 'bronze', amount: number }

export class RecordSpendCoinUseCase implements BaseUseCase<Input, void> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.recordSpendCoin(input.userId, input.coin, input.amount)
	}
}