import { ReportEntity } from '@modules/reports/domain/entities/report'
import { BaseMapper } from '@utils/commons'
import { ReportFromModel, ReportToModel } from '../models/reports'

export class ReportMapper extends BaseMapper<ReportFromModel, ReportToModel, ReportEntity> {
	mapFrom (param: ReportFromModel | null) {
		return !param ? null : new ReportEntity({
			id: param._id.toString(),
			type: param.type,
		    reporterId: param.reporterId,
		    reportedId: param.reportedId,
		    reporterBio: param.reporterBio,
		    reported: param.reported,
		    message: param.message,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: ReportEntity) {
		return {
			type: param.type,
		    reporterId: param.reporterId,
		    reportedId: param.reportedId,
		    reporterBio: param.reporterBio,
		    reported: param.reported,
		    message: param.message,
		}
	}
}