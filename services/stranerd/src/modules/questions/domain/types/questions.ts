export enum QuestionType {
	users = 'users',
	classes = 'classes'
}

type UserType = {
	type: QuestionType.users
}

type ClassType = {
	type: QuestionType.classes
	classId: string
}

export type QuestionData = UserType | ClassType