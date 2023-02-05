export enum AuthRole {
	isStranerdAdmin = 'isStranerdAdmin',
	isStranerdTutor = 'isStranerdTutor',
	isSuperAdmin = 'isSuperAdmin',
	isSubscribed = 'isSubscribed',
}

export type AuthRoles = Partial<Record<AuthRole, boolean>>