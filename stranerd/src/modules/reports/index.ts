import { ReportRepository } from './data/repositories/report'
import { CreateReportUseCase } from './domain/useCases/createReportUseCase'
import { FindReportUseCase } from './domain/useCases/findReportUseCase'
import { GetReportUseCase } from './domain/useCases/getReportUseCase'

const reportRepository = ReportRepository.getInstance()


export const FindReport = new FindReportUseCase(reportRepository)
export const CreateReport = new CreateReportUseCase(reportRepository)
export const GetReports = new GetReportUseCase(reportRepository)