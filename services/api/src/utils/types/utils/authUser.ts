export enum SupportedAuthRoles {
	isStranerdAdmin = 'isStranerdAdmin',
	isStranerdTutor = 'isStranerdTutor',
	isVerified = 'isVerified',
	isSuperAdmin = 'isSuperAdmin',
	isSubscribed = 'isSubscribed',
}

export type AuthRoles = Partial<Record<SupportedAuthRoles, boolean>>