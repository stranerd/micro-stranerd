export enum PrepType {
	pastQuestion = 'pastQuestion'
}

type PastQuestionType = {
	type: PrepType.pastQuestion
	courseId: string
	year: number
	institutionId: string
}

export type PrepData = PastQuestionType