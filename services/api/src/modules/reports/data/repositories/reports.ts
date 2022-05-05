import { IReportRepository } from '../../domain/irepositories/reports'
import { ReportMapper } from '../mappers/reports'
import { Report } from '../mongooseModels/reports'
import { ReportFromModel, ReportToModel } from '../models/reports'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { EmbeddedUser } from '../../domain/types'

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

	async delete (id: string) {
		const report = await Report.findByIdAndDelete(id)
		return !!report
	}

	async updateUserBio (user: EmbeddedUser) {
		const res = await Report.updateMany({ 'user.id': user.id }, { user })
		return !!res.acknowledged
	}
}