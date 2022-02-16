import { ReportData, UserBio, UserRoles } from '../../domain/types'

export interface ReportFromModel extends ReportToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	data: ReportData
	reporterId: string
	reporterBio: UserBio
	reporterRoles: UserRoles
	reportedId: string
	message: string
}