export interface IAuthRole {}
export interface IAuthTypes {
	google: 'google',
	apple: 'apple',
	email: 'email',
	facebook: 'facebook',
	twitter: 'twitter',
	github: 'github'
}
export interface IEmailsList {}
export interface IEventTypes {}
export interface IDelayedJobs {}
export interface ICronLikeJobs {}
export interface ICronTypes {
    hourly: 'hourly',
	daily: 'daily',
	weekly: 'weekly',
	monthly: 'monthly'
}

export type Enum<T> = T[keyof T]

