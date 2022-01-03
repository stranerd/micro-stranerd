import { BaseEntity } from '@utils/commons'
import { ReportData, UserBio } from '../types'

export class ReportEntity extends BaseEntity {
	public readonly id: string
	public readonly data: ReportData
	public readonly reporterId: string
	public readonly reporterBio: UserBio
	public readonly reportedId: string
	public readonly message: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, data, reporterId, reporterBio, reportedId, message,
		             createdAt, updatedAt
	             }: ReportConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.reporterId = reporterId
		this.reportedId = reportedId
		this.reporterBio = reporterBio
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReportConstructorArgs = {
	id: string,
	data: ReportData
	reporterId: string
	reporterBio: UserBio
	reportedId: string
	message: string
	createdAt: number
	updatedAt: number
}
