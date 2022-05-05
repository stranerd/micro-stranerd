import { MediaOutput } from '@utils/commons'

export { UserBio, UserRoles, EmbeddedUser } from '@modules/users'
export * from './events'

export type Media = MediaOutput

export enum ClassUsers {
	admins = 'admins',
	tutors = 'tutors',
	members = 'members'
}