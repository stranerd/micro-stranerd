import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { ReportEntity } from '../entities/report'
import { IReportRepository } from '../i-repositories/report'

export class GetReportUseCase extends BaseUseCase<QueryParams, QueryResults<ReportEntity>> {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
