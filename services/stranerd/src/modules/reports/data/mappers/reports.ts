import { ReportEntity } from '../../domain/entities/reports'
import { BaseMapper } from '@utils/commons'
import { ReportFromModel, ReportToModel } from '../models/reports'

export class ReportMapper extends BaseMapper<ReportFromModel, ReportToModel, ReportEntity> {
	mapFrom (param: ReportFromModel | null) {
		return !param ? null : new ReportEntity({
			id: param._id.toString(),
			data: param.data,
			reporterId: param.reporterId,
			reportedId: param.reportedId,
			reporterBio: param.reporterBio,
			message: param.message,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: ReportEntity) {
		return {
			data: param.data,
			reporterId: param.reporterId,
			reportedId: param.reportedId,
			reporterBio: param.reporterBio,
			message: param.message
		}
	}
}