import { MediaOutput } from '@utils/common'

export enum PastQuestionType {
	objective = 'objective',
	theory = 'theory'
}

type ObjType = {
	type: PastQuestionType.objective
	correctIndex: number
	options: string[]
	optionsMedia: MediaOutput[][]
	explanation: string
	explanationMedia: MediaOutput[]
}

type TheoryType = {
	type: PastQuestionType.theory
	answer: string
	answerMedia: MediaOutput[]
}

export type PastQuestionData = ObjType | TheoryType