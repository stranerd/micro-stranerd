import { BaseEntity } from '@utils/commons'
import { ChatEntity } from './chat'
import { ChatData, ChatMetaData, ChatType } from '../types'

export class ChatMetaEntity extends BaseEntity {
	public readonly id: string
	public readonly members: string[]
	public readonly data: ChatMetaData
	public readonly last: ChatEntity | null
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly readAt: Record<string, number>

	constructor ({
		             id, data, members, last, createdAt, updatedAt, readAt
	             }: ChatMetaConstructorArgs) {
		super()
		this.id = id
		this.members = members
		this.data = data
		this.last = last
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.readAt = readAt
	}

	getEmbedded (): ChatData {
		if (this.data.type === ChatType.personal) return { type: ChatType.personal, members: this.members }
		else return {
			type: ChatType.discussions,
			classId: this.data.group.classId,
			members: this.members
		}
	}
}

type ChatMetaConstructorArgs = {
	id: string,
	members: string[]
	data: ChatMetaData
	last: ChatEntity | null
	createdAt: number
	updatedAt: number
	readAt: Record<string, number>
}
