import { BaseUseCase } from '@utils/commons'
import { ReportToModel } from '@modules/reports/data/models/reports'
import { ReportEntity } from '../entities/report'
import { IReportRepository } from '../i-repositories/report'

export class CreateReportUseCase implements BaseUseCase<ReportToModel, ReportEntity> {
	repository: IReportRepository

	constructor (repo: IReportRepository) {
		this.repository = repo
	}

	async execute (input: ReportToModel) {
		return await this.repository.create(input)
	}
}