import { MediaOutput } from '@utils/commons'

export { EmbeddedUser } from '@modules/users'
export * from './events'

export type Media = MediaOutput

export enum ClassUsers {
	admins = 'admins',
	tutors = 'tutors',
	members = 'members'
}

export type EmbeddedGroup = {
	id: string
	classId: string
	name: string
}