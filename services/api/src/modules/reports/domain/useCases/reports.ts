import { ReportToModel } from '../../data/models/reports'
import { IReportRepository } from '../irepositories/reports'
import { QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export class ReportsUseCase {
	repository: IReportRepository

	constructor (repo: IReportRepository) {
		this.repository = repo
	}

	async create (input: ReportToModel) {
		return await this.repository.create(input)
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateReportsUserBio(input.userId, input.userBio, input.userRoles)
	}
}