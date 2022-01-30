import { BaseUseCase } from '@utils/commons'
import { IBadgeRepository } from '../../i-repositories/badges'
import { CountStreakBadges } from '@modules/users/domain/types'

type Input = { userId: string, activity: CountStreakBadges, add: boolean }

export class RecordCountStreakUseCase implements BaseUseCase<Input, void> {
	repository: IBadgeRepository

	constructor (repo: IBadgeRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return
		// eslint-disable-next-line no-unreachable
		return await this.repository.recordCountStreak(input.userId, input.activity, input.add)
	}
}