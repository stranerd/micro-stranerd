export enum CountStreakBadges {
	NewQuestion = 'NewQuestion',
	NewAnswer = 'NewAnswer',
	NewTag = 'NewTag',
	NewAnswerComment = 'NewAnswerComment',
	NewAnswerVote = 'NewAnswerVote',
	GiveBestAnswer = 'GiveBestAnswer',
	GetBestAnswer = 'GetBestAnswer',
	AttendSession = 'AttendSession',
	HostSession = 'HostSession'
}

export enum CoinBadges {
	SpendBronze = 'SpendBronze',
	SpendGold = 'SpendGold'
}

export const CountValues = [
	{ level: 1, value: 10, name: 'beginner' },
	{ level: 2, value: 25, name: 'amateur' },
	{ level: 3, value: 50, name: 'average' },
	{ level: 4, value: 100, name: 'reasonable' },
	{ level: 5, value: 250, name: 'competent' },
	{ level: 6, value: 500, name: 'veteran' },
	{ level: 7, value: 1000, name: 'celebrity' },
	{ level: 8, value: 2500, name: 'professional' },
	{ level: 9, value: 5000, name: 'master' },
	{ level: 10, value: 10000, name: 'legendary' }
] as const

export const StreakValues = [
	{ level: 1, value: 3 },
	{ level: 2, value: 7 },
	{ level: 3, value: 14 },
	{ level: 4, value: 21 },
	{ level: 5, value: 30 },
	{ level: 6, value: 45 },
	{ level: 7, value: 60 },
	{ level: 8, value: 90 }
] as const

export const CoinValues = [
	{ level: 1, value: 50 },
	{ level: 2, value: 100 },
	{ level: 3, value: 250 },
	{ level: 4, value: 500 },
	{ level: 5, value: 1000 },
	{ level: 6, value: 2000 },
	{ level: 7, value: 3000 },
	{ level: 8, value: 4000 },
	{ level: 9, value: 5000 },
	{ level: 10, value: 10000 }
] as const