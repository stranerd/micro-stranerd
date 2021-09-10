import { ChangeStreamCallbacks } from '@utils/commons'
import { ReportFromModel } from '@modules/reports/data/models/reports'
import { ReportEntity } from '@modules/reports/domain/entities/reports'

export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {}