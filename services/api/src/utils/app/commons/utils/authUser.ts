export interface RefreshUser {
	id: string
}

export interface AuthUser {
	id: string
}

export enum AuthTypes {
	google = 'google',
	apple = 'apple',
	email = 'email',
	facebook = 'facebook',
	twitter = 'twitter',
	github = 'github',
	microsoft = 'microsoft'
}