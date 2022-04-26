import { ReportRepository } from './data/repositories/reports'
import { ReportsUseCase } from './domain/useCases/reports'

const reportRepository = ReportRepository.getInstance()

export const ReportsUseCases = new ReportsUseCase(reportRepository)

export { ReportData, ReportType } from './domain/types'
export { ReportFromModel } from './data/models/reports'
export { ReportEntity } from './domain/entities/reports'