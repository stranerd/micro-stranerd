import { IReportRepository } from '../../domain/i-repositories/reports'
import { ReportMapper } from '../mappers/reports'
import { Report } from '../mongooseModels/reports'
import { ReportFromModel, ReportToModel } from '../models/reports'
import { parseQueryParams, QueryParams } from '@utils/commons'

export class ReportRepository implements IReportRepository {
	private static instance: ReportRepository
	private mapper = new ReportMapper()

	static getInstance (): ReportRepository {
		if (!ReportRepository.instance) ReportRepository.instance = new ReportRepository()
		return ReportRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ReportFromModel>(Report, query)
		return {
			...data,
			results: data.results.map((n) => this.mapper.mapFrom(n)!)
		}
	}

	async find (id: string) {
		const report = await Report.findById(id)
		return this.mapper.mapFrom(report)
	}

	async create (data: ReportToModel) {
		const report = await new Report(data).save()
		return this.mapper.mapFrom(report)!
	}
}