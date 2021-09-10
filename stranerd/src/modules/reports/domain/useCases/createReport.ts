import { BaseUseCase } from '@utils/commons'
import { ReportToModel } from '../../data/models/reports'
import { ReportEntity } from '../entities/reports'
import { IReportRepository } from '../i-repositories/reports'
import { ReportData } from '../types'

type Input = Omit<ReportToModel, 'reported'> & ReportData

export class CreateReportUseCase implements BaseUseCase<Input, ReportEntity> {
	repository: IReportRepository

	constructor (repo: IReportRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.create(input)
	}
}