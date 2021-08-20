export interface RoleInput {
	app: AppTypes;
	userId: string;
	role: RoleTypes;
	value: boolean;
}

export type RoleTypes = 'isModerator' | 'isAdmin'
export type AppTypes = 'stranerd' | 'tutorStack' | 'brainBox'