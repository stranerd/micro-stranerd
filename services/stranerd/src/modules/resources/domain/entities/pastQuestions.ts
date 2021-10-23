import { BaseEntity, MediaOutput } from '@utils/commons'

export class PastQuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly order: number
	public readonly year: number
	public readonly institutionId: string
	public readonly courseId: string
	public readonly question: string
	public readonly questionMedia: MediaOutput[]
	public readonly answer: string
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
		this.answer = data.answer
		this.questionMedia = data.questionMedia
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}

export class PastQuestionTheoryEntity extends PastQuestionEntity {
	public readonly answerMedia: MediaOutput[]

	constructor (data: PastQuestionTheoryConstructorArgs) {
		super(data)
		this.answerMedia = data.answerMedia
	}
}

export class PastQuestionObjEntity extends PastQuestionEntity {
	constructor (data: PastQuestionObjConstructorArgs) {
		super(data)
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
	answer: string
	createdAt: number
	updatedAt: number
}

type PastQuestionTheoryConstructorArgs = PastQuestionConstructorArgs & {
	answerMedia: MediaOutput[]
}

type PastQuestionObjConstructorArgs = PastQuestionConstructorArgs & {}