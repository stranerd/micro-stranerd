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
	rankings: Record<UserRankings, number>
	meta: Record<UserMeta, number>
	ratings: {
		total: number
		count: number
	}
	streak: {
		count: number
		longestStreak: number
		lastEvaluatedAt: number
	}
}

export enum UserMeta {
	questions = 'questions',
	answers = 'answers',
	bestAnswers = 'bestAnswers',
	answerComments = 'answerComments',
	sessions = 'sessions',
	tutorSessions = 'tutorSessions',
	flashCards = 'flashCards',
	sets = 'sets'
}

export enum UserRankings {
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	overall = 'overall'
}

export interface UserSession {
	currentSessions: string[]
	currentTutorSessions: string[]
	requests: string[]
	lobby: string[]
}

export enum ScoreRewards {
	BestAnswer = 3,
	NewAnswer = 1,
	NewQuestion = 0.5,
	UpvoteAnswer = 0.5,
	NewComment = 0.5,

	CompleteSession = 1,

	CompleteTest = 2,
	NewFlashCard = 3,
	NewSet = 3
}