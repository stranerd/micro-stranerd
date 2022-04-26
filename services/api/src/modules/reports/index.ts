import { ReportRepository } from './data/repositories/reports'
import { CreateReportUseCase } from './domain/useCases/createReport'
import { FindReportUseCase } from './domain/useCases/findReport'
import { GetReportsUseCase } from './domain/useCases/getReports'
import { DeleteReportUseCase } from './domain/useCases/deleteReport'
import { UpdateReportsUserBioUseCase } from './domain/useCases/updateReportsUserBio'

const reportRepository = ReportRepository.getInstance()

export const FindReport = new FindReportUseCase(reportRepository)
export const CreateReport = new CreateReportUseCase(reportRepository)
export const GetReports = new GetReportsUseCase(reportRepository)
export const DeleteReport = new DeleteReportUseCase(reportRepository)
export const UpdateReportsUserBio = new UpdateReportsUserBioUseCase(reportRepository)

export { ReportData, ReportType } from './domain/types'
export { ReportFromModel } from './data/models/reports'
export { ReportEntity } from './domain/entities/reports'