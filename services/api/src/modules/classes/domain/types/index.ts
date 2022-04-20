import { MediaOutput } from '@utils/commons'

export { UserBio, UserRoles } from '@modules/users'

export type Media = MediaOutput

export enum ClassUsers {
	admins = 'admins',
	tutors = 'tutors',
	members = 'members'
}