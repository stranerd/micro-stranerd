import { BaseUseCase } from '@utils/commons'
import { IBadgeRepository } from '../../i-repositories/badges'

type Input = { userId: string, rank: number, add: boolean }

export class RecordRankUseCase implements BaseUseCase<Input, void> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.recordRank(input.userId, input.rank, input.add)
	}
}