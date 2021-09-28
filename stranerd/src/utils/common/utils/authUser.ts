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
	twitter = 'twitter'
}

export type AuthRoles = Record<AuthApps, Record<string, boolean>>

export enum AuthApps {
	Stranerd = 'stranerd'
}