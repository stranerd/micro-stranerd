export enum TestType {
	timed = 'timed',
	unTimed = 'unTimed'
}

type TimedType = {
	type: TestType.timed
	time: number
}

type UnTimedType = {
	type: TestType.unTimed
}

export type AnswerType = number | string

export type TestData = TimedType | UnTimedType