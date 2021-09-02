import { AuthRoles, MediaOutput } from '@utils/commons'

export type UserBio = {
	email: string
	firstName: string
	lastName: string
	photo: MediaOutput | null
}

export type UserRoles = AuthRoles

export type UserDates = {
	createdAt: number
	deletedAt: number
}

export type UserTutor = {
	strongestSubject: string | null,
	weakerSubjects: string[]
}

export type UserStatus = {
	connections: Record<string, boolean>
	lastUpdatedAt: number
}

export type UserAccount = {
	score: number
	coins: {
		gold: number,
		bronze: number
	},
	meta: {
		questions: number
		answers: number
	},
	ratings: {
		total: number
		count: number
	}
}

export enum ScoreRewards {
	best_anwser = 4,
	new_question = 0.05,
	new_answer = 0.1,
	complete_seesion = 1
}