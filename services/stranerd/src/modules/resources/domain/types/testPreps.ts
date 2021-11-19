export enum PrepType {
	pastQuestion = 'pastQuestion'
}

type PastQuestionType = {
	type: PrepType.pastQuestion
	courseId: string
	year: string
	institutionId: string
}

export type PrepData = PastQuestionType