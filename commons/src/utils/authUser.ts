export type AuthUser = {
	id: string
	isVerified: boolean
	roles: Record<string, Record<string, boolean>>
	authTypes: AuthTypes[]
}

export type RefreshUser = {
	id: string
}

export type AuthTypes = 'google' | 'email' | 'facebook' | 'twitter'