import { ReportEntity } from '../../domain/entities/reports'
import { BaseMapper } from '@utils/commons'
import { ReportFromModel, ReportToModel } from '../models/reports'

export class ReportMapper extends BaseMapper<ReportFromModel, ReportToModel, ReportEntity> {
	mapFrom (param: ReportFromModel | null) {
		return !param ? null : new ReportEntity({
			id: param._id.toString(),
			data: param.data,
			user: param.user,
			reportedId: param.reportedId,
			message: param.message,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: ReportEntity) {
		return {
			data: param.data,
			user: param.user,
			reportedId: param.reportedId,
			message: param.message
		}
	}
}