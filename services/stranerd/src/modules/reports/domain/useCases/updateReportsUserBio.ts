import { BaseUseCase } from '@utils/commons'
import { IReportRepository } from '../irepositories/reports'
import { UserBio, UserRoles } from '../types'

type Input = { userId: string, userBio: UserBio, userRoles: UserRoles }

export class UpdateReportsUserBioUseCase extends BaseUseCase<Input, boolean> {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateReportsUserBio(input.userId, input.userBio, input.userRoles)
	}
}