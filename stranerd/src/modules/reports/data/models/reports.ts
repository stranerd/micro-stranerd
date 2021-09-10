import { ReportType, UserBio } from '../../domain/types'

export interface ReportFromModel extends ReportToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	type: ReportType
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	reported: Record<string, any>
	message: string
}