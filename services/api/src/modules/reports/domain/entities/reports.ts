import { BaseEntity } from '@utils/commons'
import { EmbeddedUser, ReportData } from '../types'

export class ReportEntity extends BaseEntity {
	public readonly id: string
	public readonly data: ReportData
	public readonly user: EmbeddedUser
	public readonly reportedId: string
	public readonly message: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, data, user, reportedId, message,
		             createdAt, updatedAt
	             }: ReportConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.user = user
		this.reportedId = reportedId
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReportConstructorArgs = {
	id: string,
	data: ReportData
	user: EmbeddedUser
	reportedId: string
	message: string
	createdAt: number
	updatedAt: number
}
