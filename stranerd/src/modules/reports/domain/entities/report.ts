import { ReportType } from '@modules/reports/data/models/reports'
import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types/users'

export class ReportEntity extends BaseEntity {
	public readonly id: string
	public readonly type: ReportType
	public readonly reporterId: string
	public readonly reporterBio: UserBio
	public readonly reportedId: string
	public readonly reported: object
	public readonly message: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, reporterId, reporterBio, reportedId, type, reported, message,
		             createdAt, updatedAt
	             }: PaymentConstructorArgs) {
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

type PaymentConstructorArgs = {
	id: string,
	type: ReportType
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	reported: Object
	message: string
	createdAt: number, 
	updatedAt: number
}
