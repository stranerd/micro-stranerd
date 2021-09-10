import { ReportRepository } from './data/repositories/reports'
import { CreateReportUseCase } from './domain/useCases/createReport'
import { FindReportUseCase } from './domain/useCases/findReport'
import { GetReportsUseCase } from './domain/useCases/getReports'

const reportRepository = ReportRepository.getInstance()

export const FindReport = new FindReportUseCase(reportRepository)
export const CreateReport = new CreateReportUseCase(reportRepository)
export const GetReports = new GetReportsUseCase(reportRepository)