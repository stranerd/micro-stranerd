export type RefreshUser = {
	id: string
}

export type AuthUser = {
	id: string
	isVerified: boolean
	authTypes: AuthTypes[]
	roles: AuthRoles
}

export enum AuthTypes {
	google = 'google',
	email = 'email',
	facebook = 'facebook',
	twitter = 'twitter',
	github = 'github',
	microsoft = 'microsoft'
}

export type AuthRoles = Record<string, any>