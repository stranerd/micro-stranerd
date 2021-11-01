import {
	AddPastObjQuestion,
	AddPastTheoryQuestion,
	DeletePastObjQuestion,
	DeletePastTheoryQuestion,
	FindPastObjQuestion,
	FindPastTheoryQuestion,
	GetPastObjQuestions,
	GetPastTheoryQuestions,
	UpdatePastObjQuestion,
	UpdatePastTheoryQuestion
} from '@modules/resources'
import { NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class PastQuestionController {
	static async FindPastTheoryQuestion (req: Request) {
		return await FindPastTheoryQuestion.execute(req.params.id)
	}

	static async GetPastTheoryQuestion (req: Request) {
		const query = req.query as QueryParams
		return await GetPastTheoryQuestions.execute(query)
	}

	static async UpdatePastTheoryQuestion (req: Request) {
		const data = validate({
			institutionId: req.body.institutionId,
			courseId: req.body.courseId,
			order: req.body.order,
			year: req.body.year,
			question: req.body.question,
			answer: req.body.answer,
			questionMedia: req.body.questionMedia,
			answerMedia: req.body.answerMedia
		}, {
			institutionId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courseId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			order: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			year: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			question: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			answer: { required: true, rules: [Validation.isString] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			answerMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})

		const updatedPastQuestion = await UpdatePastTheoryQuestion.execute({ id: req.params.id, data })

		if (updatedPastQuestion) return updatedPastQuestion
		throw new NotAuthorizedError()
	}

	static async CreatePastTheoryQuestion (req: Request) {
		const data = validate({
			institutionId: req.body.institutionId,
			courseId: req.body.courseId,
			order: req.body.order,
			year: req.body.year,
			question: req.body.question,
			answer: req.body.answer,
			questionMedia: req.body.questionMedia,
			answerMedia: req.body.answerMedia
		}, {
			institutionId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courseId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			order: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			year: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			question: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			answer: { required: true, rules: [Validation.isString] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			answerMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})

		return await AddPastTheoryQuestion.execute(data)
	}

	static async DeletePastTheoryQuestion (req: Request) {
		const isDeleted = await DeletePastTheoryQuestion.execute(req.params.id)
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async FindPastObjQuestion (req: Request) {
		return await FindPastObjQuestion.execute(req.params.id)
	}

	static async GetPastObjQuestion (req: Request) {
		const query = req.query as QueryParams
		return await GetPastObjQuestions.execute(query)
	}

	static async UpdatePastObjQuestion (req: Request) {
		const data = validate({
			institutionId: req.body.institutionId,
			courseId: req.body.courseId,
			order: req.body.order,
			year: req.body.year,
			question: req.body.question,
			questionMedia: req.body.questionMedia,
			answer: req.body.answer,
			a: req.body.a,
			b: req.body.b,
			c: req.body.c,
			d: req.body.d,
			e: req.body.e,
			explanation: req.body.explanation,
			aMedia: req.body.aMedia,
			bMedia: req.body.bMedia,
			cMedia: req.body.cMedia,
			dMedia: req.body.dMedia,
			eMedia: req.body.eMedia,
			explanationMedia: req.body.explanationMedia
		}, {
			institutionId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courseId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			order: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			year: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			question: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			answer: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(['a', 'b', 'c', 'd', 'e'], (curr, val) => curr === val)]
			},
			a: { required: true, rules: [Validation.isString] },
			b: { required: true, rules: [Validation.isString] },
			c: { required: true, rules: [Validation.isString] },
			d: { required: true, rules: [Validation.isString] },
			e: { required: true, rules: [Validation.isString] },
			explanation: { required: true, rules: [Validation.isString] },
			aMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			bMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			cMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			dMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			eMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			explanationMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})

		const updatedPastQuestion = await UpdatePastObjQuestion.execute({ id: req.params.id, data })

		if (updatedPastQuestion) return updatedPastQuestion
		throw new NotAuthorizedError()
	}

	static async CreatePastObjQuestion (req: Request) {
		const data = validate({
			institutionId: req.body.institutionId,
			courseId: req.body.courseId,
			order: req.body.order,
			year: req.body.year,
			question: req.body.question,
			questionMedia: req.body.questionMedia,
			answer: req.body.answer,
			a: req.body.a,
			b: req.body.b,
			c: req.body.c,
			d: req.body.d,
			e: req.body.e,
			explanation: req.body.explanation,
			aMedia: req.body.aMedia,
			bMedia: req.body.bMedia,
			cMedia: req.body.cMedia,
			dMedia: req.body.dMedia,
			eMedia: req.body.eMedia,
			explanationMedia: req.body.explanationMedia
		}, {
			institutionId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courseId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			order: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			year: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			question: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			answer: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(['a', 'b', 'c', 'd', 'e'], (curr, val) => curr === val)]
			},
			a: { required: true, rules: [Validation.isString] },
			b: { required: true, rules: [Validation.isString] },
			c: { required: true, rules: [Validation.isString] },
			d: { required: true, rules: [Validation.isString] },
			e: { required: true, rules: [Validation.isString] },
			explanation: { required: true, rules: [Validation.isString] },
			aMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			bMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			cMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			dMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			eMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},
			explanationMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})

		return await AddPastObjQuestion.execute(data)
	}

	static async DeletePastObjQuestion (req: Request) {
		const isDeleted = await DeletePastObjQuestion.execute(req.params.id)
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}