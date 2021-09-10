import { BaseEntity } from '@utils/commons'
import { ReportType, UserBio } from '../types'

export class ReportEntity extends BaseEntity {
	public readonly id: string
	public readonly type: ReportType
	public readonly reporterId: string
	public readonly reporterBio: UserBio
	public readonly reportedId: string
	public readonly reported: Record<string, any>
	public readonly message: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, reporterId, reporterBio, reportedId, type, reported, message,
		             createdAt, updatedAt
	             }: ReportConstructorArgs) {
		super()
		this.id = id
		this.type = type
		this.reporterId = reporterId
		this.reportedId = reportedId
		this.reporterBio = reporterBio
		this.reported = reported
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReportConstructorArgs = {
	id: string,
	type: ReportType
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	reported: Record<string, any>
	message: string
	createdAt: number
	updatedAt: number
}
