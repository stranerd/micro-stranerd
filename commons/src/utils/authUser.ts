export type RefreshUser = {
	id: string
}

export type AuthUser = {
	id: string
	isVerified: boolean
	authTypes: AuthTypes[]
	roles: {
		stranerd: {
			isAdmin: boolean
			isModerator: boolean
		},
		tutorStack: {
			isAdmin: boolean
			isModerator: boolean
		},
		brainBox: {
			isAdmin: boolean
			isModerator: boolean
		}
	}
}

export type AuthTypes = 'google' | 'email' | 'facebook' | 'twitter'

export type RoleApps = keyof AuthUser['roles']