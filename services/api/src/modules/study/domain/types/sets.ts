export enum SetSaved {
	flashCards = 'flashCards',
	testPreps = 'testPreps',
	notes = 'notes',
	videos = 'videos',
	sets = 'sets'
}

export enum SetType {
	users = 'users',
	classes = 'classes'
}

type UserType = {
	type: SetType.users
}

type ClassType = {
	type: SetType.classes
	classId: string
}

export type SetData = UserType | ClassType