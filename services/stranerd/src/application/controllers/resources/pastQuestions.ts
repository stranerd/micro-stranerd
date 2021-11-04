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
			correctIndex: req.body.correctIndex,
			options: req.body.options,
			optionsMedia: req.body.optionsMedia,
			explanation: req.body.explanation,
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
			correctIndex: {
				required: true,
				rules: [Validation.isNumber, Validation.isMoreThanX(-1), Validation.isLessThanX(req.body.options.length ?? 0)]
			},
			options: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: true,
				rules: [
					Validation.hasLessThanX(req.body.options.length + 1), Validation.hasMoreThanX(req.body.options.length - 1),
					Validation.isArrayOfX((option: any) => Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: true, rules: [Validation.isString] },
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
			correctIndex: req.body.correctIndex,
			options: req.body.options,
			optionsMedia: req.body.optionsMedia,
			explanation: req.body.explanation,
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
			correctIndex: {
				required: true,
				rules: [Validation.isNumber, Validation.isMoreThanX(-1), Validation.isLessThanX(req.body.options.length ?? 0)]
			},
			options: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: true,
				rules: [
					Validation.hasLessThanX(req.body.options.length + 1), Validation.hasMoreThanX(req.body.options.length - 1),
					Validation.isArrayOfX((option: any) => Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: true, rules: [Validation.isString] },
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