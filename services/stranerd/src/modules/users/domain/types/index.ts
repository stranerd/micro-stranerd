import { AuthRoles, MediaOutput } from '@utils/commons'

export * from './badges'

export type UserBio = {
	email: string
	firstName: string
	lastName: string
	description: string
	photo: MediaOutput | null
}

export type UserRoles = AuthRoles

export type UserDates = {
	createdAt: number
	deletedAt: number | null
}

export type UserTutor = {
	strongestSubject: string | null,
	weakerSubjects: string[]
	tags: Record<string, number>
}

export type UserStatus = {
	connections: string[]
	lastUpdatedAt: number
}

export type UserAccount = {
	score: number
	rankings: {
		daily: number
		weekly: number
		monthly: number
	}
	coins: {
		gold: number,
		bronze: number
	},
	meta: {
		questions: number
		answers: number
		bestAnswers: number
		answerComments: number
		sessions: number
		tutorSessions: number
	},
	ratings: {
		total: number
		count: number
	},
	streak: {
		count: number,
		longestStreak: number,
		lastEvaluatedAt: number
	}
}

export enum UserMeta {
	questions = 'questions',
	answers = 'answers',
	bestAnswers = 'bestAnswers',
	answerComments = 'answerComments',
	sessions = 'sessions',
	tutorSessions = 'tutorSessions'
}

export enum UserRankings {
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly'
}

export interface UserSession {
	currentSessions: string[]
	currentTutorSessions: string[]
	requests: string[]
	lobby: string[]
}

export enum ScoreRewards {
	BestAnswer = 4,
	CompleteSession = 1,
	NewAnswer = 0.1,
	NewQuestion = 0.05
}