export enum SupportedAuthRoles {
	isStranerdAdmin = 'isStranerdAdmin',
	isStranerdTutor = 'isStranerdTutor',
	isVerified = 'isVerified',
	isSuperAdmin = 'isSuperAdmin',
}

export type AuthRoles = Partial<Record<SupportedAuthRoles, boolean>>