import { ChangeStreamCallbacks } from '@utils/commons'
import { ReportEntity, ReportFromModel } from '@modules/reports'

export const ReportChangeStreamCallbacks: ChangeStreamCallbacks<ReportFromModel, ReportEntity> = {}