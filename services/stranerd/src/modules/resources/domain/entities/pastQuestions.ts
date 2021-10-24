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
	public readonly a: string
	public readonly b: string
	public readonly c: string
	public readonly d: string
	public readonly e: string
	public readonly aMedia: MediaOutput[]
	public readonly bMedia: MediaOutput[]
	public readonly cMedia: MediaOutput[]
	public readonly dMedia: MediaOutput[]
	public readonly eMedia: MediaOutput[]

	constructor (data: PastQuestionObjConstructorArgs) {
		super(data)
		this.a = data.a
		this.b = data.b
		this.c = data.c
		this.d = data.d
		this.e = data.e
		this.aMedia = data.eMedia
		this.bMedia = data.bMedia
		this.cMedia = data.cMedia
		this.dMedia = data.dMedia
		this.eMedia = data.eMedia
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

type PastQuestionObjConstructorArgs = PastQuestionConstructorArgs & {
	a: string
	b: string
	c: string
	d: string
	e: string
	aMedia: MediaOutput[]
	bMedia: MediaOutput[]
	cMedia: MediaOutput[]
	dMedia: MediaOutput[]
	eMedia: MediaOutput[]
}