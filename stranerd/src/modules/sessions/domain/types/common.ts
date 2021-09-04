import { MediaOutput } from '@utils/commons'

export type UserBio = {
	email: string
	firstName: string
	lastName: string
	photo: MediaOutput | null
}

export type Media = MediaOutput
