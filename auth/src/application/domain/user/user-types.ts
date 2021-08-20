interface AccessType {
	isAdmin: boolean,
	isModerator: boolean,
}

export interface UserTypes {
	stranerd: AccessType;
	tutorStack: AccessType;
	brainBox: AccessType;
}
