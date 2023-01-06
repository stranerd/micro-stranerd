import { EmbeddedUser, Reported } from '../../domain/types'

export interface ReportFromModel extends ReportToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	entity: Reported
	user: EmbeddedUser
	message: string
}