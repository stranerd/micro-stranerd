import { UserBio } from '@modules/reports/domain/types/users'

export type ReportType = 'user' | 'question' | 'answer'

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
	reported: Object
	message: string
}