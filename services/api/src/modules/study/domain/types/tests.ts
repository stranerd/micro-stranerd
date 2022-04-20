export enum TestType {
	timed = 'timed',
	unTimed = 'unTimed'
}

type TimedType = {
	type: TestType.timed
	time: number
}

type UnTimedType = {
	type: TestType.timed
	time: number
}

export type AnswerType = number | string

export type TestData = TimedType | UnTimedType