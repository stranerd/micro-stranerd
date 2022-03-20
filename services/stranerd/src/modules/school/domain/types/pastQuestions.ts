import { Media } from './index'

export enum PastQuestionType {
	objective = 'objective',
	theory = 'theory',
	german = 'german',
	practical = 'practical'
}

type ObjType = {
	type: PastQuestionType.objective
	correctIndex: number
	options: string[]
	optionsMedia: Media[][]
	explanation: string
	explanationMedia: Media[]
}

type TheoryType = {
	type: PastQuestionType.theory
	answer: string
	answerMedia: Media[]
}

type GermanType = {
	type: PastQuestionType.german
	answer: string
	answerMedia: Media[]
}

type PracticalType = {
	type: PastQuestionType.practical
	answer: string
	answerMedia: Media[]
}

export type PastQuestionData = ObjType | TheoryType | PracticalType | GermanType