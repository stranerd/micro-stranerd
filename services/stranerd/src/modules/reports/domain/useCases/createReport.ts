import { BaseUseCase } from '@utils/commons'
import { ReportToModel } from '../../data/models/reports'
import { ReportEntity } from '../entities/reports'
import { IReportRepository } from '../i-repositories/reports'

type Input = ReportToModel

export class CreateReportUseCase implements BaseUseCase<Input, ReportEntity> {
	repository: IReportRepository

	constructor (repo: IReportRepository) {
		this.repository = repo
	}

	async execute (input: Input) {
		return await this.repository.create(input)
	}
}