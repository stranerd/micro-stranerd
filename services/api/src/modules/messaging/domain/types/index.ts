import { EmbeddedUser } from '@modules/users'
import { MediaOutput } from '@utils/commons'
import { EmbeddedGroup } from '@modules/classes'

export { EmbeddedUser, EmbeddedGroup }

export type Media = MediaOutput

export enum ChatType {
	personal = 'personal',
	classes = 'classes'
}

export type ChatMetaData = {
	type: ChatType.personal
	users: Record<string, EmbeddedUser>
} | {
	type: ChatType.classes
	group: EmbeddedGroup
}

export type ChatData = {
	type: ChatType.personal
	members: string[]
} | {
	type: ChatType.classes
	members: string[]
	classId: string
}