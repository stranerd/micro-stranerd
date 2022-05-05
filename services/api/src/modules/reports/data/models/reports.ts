import { EmbeddedUser, ReportData } from '../../domain/types'

export interface ReportFromModel extends ReportToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	data: ReportData
	user: EmbeddedUser
	reportedId: string
	message: string
}