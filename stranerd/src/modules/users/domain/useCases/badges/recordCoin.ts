import { BaseUseCase } from '@utils/commons'
import { IBadgeRepository } from '../../i-repositories/badges'
import { CoinBadges } from '../../types'

type Input = { userId: string, activity: CoinBadges, amount: number }

export class RecordCoinUseCase implements BaseUseCase<Input, void> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.recordSpendCoin(input.userId, input.activity, input.amount)
	}
}