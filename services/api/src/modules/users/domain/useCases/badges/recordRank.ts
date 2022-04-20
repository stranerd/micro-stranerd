import { BaseUseCase } from '@utils/commons'
import { IBadgeRepository } from '../../i-repositories/badges'
import { RankTypes } from '../../entities/ranks'

type Input = { userId: string, rank: RankTypes, add: boolean }

export class RecordRankUseCase implements BaseUseCase<Input, void> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return
		// eslint-disable-next-line no-unreachable
		return await this.repository.recordRank(input.userId, input.rank, input.add)
	}
}