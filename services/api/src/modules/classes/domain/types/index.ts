import { MediaOutput } from '@utils/commons'

export type TaskID = string | number

export { EmbeddedUser } from '@modules/users'
export * from './events'

export type Media = MediaOutput

export enum ClassUsers {
	admins = 'admins',
	tutors = 'tutors',
	members = 'members'
}