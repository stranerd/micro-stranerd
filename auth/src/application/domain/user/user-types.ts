interface AccessType {
	isAdmin: boolean,
	isModerator: boolean,
}

export interface UserTypes extends Record<string, AccessType> {
}
