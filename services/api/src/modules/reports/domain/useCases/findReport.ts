import { BaseUseCase } from '@utils/commons'
import { ReportEntity } from '../entities/reports'
import { IReportRepository } from '../irepositories/reports'

export class FindReportUseCase implements BaseUseCase<string, ReportEntity | null> {
	repository: IReportRepository

	constructor (repo: IReportRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}