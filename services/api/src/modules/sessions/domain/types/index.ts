import { EmbeddedUser } from '@modules/users'
import { MediaOutput } from '@utils/commons'
import { EmbeddedGroup } from '@modules/classes'

export { EmbeddedUser, EmbeddedGroup }

export type Media = MediaOutput

export enum ChatType {
	personal = 'personal',
	discussions = 'discussions'
}

export type ChatMetaData = {
	type: ChatType.personal
	users: Record<string, EmbeddedUser>
} | {
	type: ChatType.discussions
	group: EmbeddedGroup
}

export type ChatData = {
	type: ChatType.personal
} | {
	type: ChatType.discussions
	classId: string
}