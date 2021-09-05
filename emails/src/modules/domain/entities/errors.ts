import { BaseEntity } from '@utils/commons'

export class ErrorEntity extends BaseEntity {
	public readonly id: string
	public readonly error: string
	public readonly subject: string
	public readonly to: string
	public readonly content: string
	public readonly from: string
	public readonly attachments: Record<string, boolean>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor (data: ErrorConstructor) {
		super()
		this.id = data.id
		this.error = data.error
		this.subject = data.subject
		this.to = data.to
		this.content = data.content
		this.from = data.from
		this.attachments = data.attachments
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}

type ErrorConstructor = {
	id: string
	error: string,
	subject: string,
	to: string,
	content: string,
	from: string,
	attachments: Record<string, boolean>
	createdAt: number
	updatedAt: number
}