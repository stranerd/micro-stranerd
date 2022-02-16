import { BaseUseCase } from '@utils/commons'
import { IReportRepository } from '../irepositories/reports'

export class DeleteReportUseCase implements BaseUseCase<string, boolean> {
	repository: IReportRepository

	constructor (repo: IReportRepository) {
		this.repository = repo
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}