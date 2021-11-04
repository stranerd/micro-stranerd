import { BaseEntity, MediaOutput } from '@utils/commons'

export class PastQuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly order: number
	public readonly year: number
	public readonly institutionId: string
	public readonly courseId: string
	public readonly question: string
	public readonly questionMedia: MediaOutput[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor (data: PastQuestionConstructorArgs) {
		super()
		this.id = data.id
		this.order = data.order
		this.year = data.year
		this.institutionId = data.institutionId
		this.courseId = data.courseId
		this.question = data.question
		this.questionMedia = data.questionMedia
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}

export class PastQuestionTheoryEntity extends PastQuestionEntity {
	public readonly answer: string
	public readonly answerMedia: MediaOutput[]

	constructor (data: PastQuestionTheoryConstructorArgs) {
		super(data)
		this.answer = data.answer
		this.answerMedia = data.answerMedia
	}
}

export class PastQuestionObjEntity extends PastQuestionEntity {
	public readonly correctIndex: number
	public readonly options: string[]
	public readonly optionsMedia: MediaOutput[][]
	public readonly explanation: string
	public readonly explanationMedia: MediaOutput[]

	constructor (data: PastQuestionObjConstructorArgs) {
		super(data)
		this.correctIndex = data.correctIndex
		this.options = data.options
		this.optionsMedia = data.optionsMedia
		this.explanation = data.explanation
		this.explanationMedia = data.explanationMedia
	}
}

type PastQuestionConstructorArgs = {
	id: string,
	order: number
	institutionId: string
	courseId: string
	year: number
	question: string
	questionMedia: MediaOutput[]
	createdAt: number
	updatedAt: number
}

type PastQuestionTheoryConstructorArgs = PastQuestionConstructorArgs & {
	answer: string
	answerMedia: MediaOutput[]
}

type PastQuestionObjConstructorArgs = PastQuestionConstructorArgs & {
	options: string[]
	optionsMedia: MediaOutput[][]
	correctIndex: number
	explanation: string
	explanationMedia: MediaOutput[]
}