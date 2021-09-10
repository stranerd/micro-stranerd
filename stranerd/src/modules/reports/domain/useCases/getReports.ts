import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { ReportEntity } from '../entities/reports'
import { IReportRepository } from '../i-repositories/reports'

export class GetReportsUseCase extends BaseUseCase<QueryParams, QueryResults<ReportEntity>> {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
