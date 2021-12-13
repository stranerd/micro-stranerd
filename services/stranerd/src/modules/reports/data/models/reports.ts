import { ReportData, UserBio } from '../../domain/types'

export interface ReportFromModel extends ReportToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	data: ReportData
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	message: string
}