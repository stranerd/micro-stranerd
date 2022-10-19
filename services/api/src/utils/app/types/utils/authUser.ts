export enum SupportedAuthRoles {
	isStranerdAdmin = 'isStranerdAdmin',
	isStranerdTutor = 'isStranerdTutor',
	isSuperAdmin = 'isSuperAdmin',
	isSubscribed = 'isSubscribed',
}

export type AuthRoles = Partial<Record<SupportedAuthRoles, boolean>>