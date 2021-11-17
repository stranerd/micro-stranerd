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

export const CountStreakBadgeNames = {
	[CountStreakBadges.NewQuestion]: 'Inquisitor',
	[CountStreakBadges.NewAnswer]: 'Aide',
	[CountStreakBadges.NewTag]: 'Clerk',
	[CountStreakBadges.NewAnswerComment]: 'Watcher',
	[CountStreakBadges.NewAnswerVote]: 'Patriot',
	[CountStreakBadges.GiveBestAnswer]: 'Believer',
	[CountStreakBadges.GetBestAnswer]: 'Aristocrat',
	[CountStreakBadges.AttendSession]: 'Learner',
	[CountStreakBadges.HostSession]: 'Lecturer'
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
	{ level: 1, value: 3, name: 'beginner' },
	{ level: 2, value: 7, name: 'amateur' },
	{ level: 3, value: 14, name: 'average' },
	{ level: 4, value: 21, name: 'reasonable' },
	{ level: 5, value: 30, name: 'competent' },
	{ level: 6, value: 45, name: 'veteran' },
	{ level: 7, value: 60, name: 'celebrity' },
	{ level: 8, value: 90, name: 'professional' }
] as const
