import {
	AddPastQuestion,
	DeletePastQuestion,
	FindPastQuestion,
	GetPastQuestions,
	PastQuestionType,
	UpdatePastQuestion
} from '@modules/resources'
import { NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class PastQuestionController {
	static async FindPastQuestion (req: Request) {
		return await FindPastQuestion.execute(req.params.id)
	}

	static async GetPastQuestion (req: Request) {
		const query = req.query as QueryParams
		return await GetPastQuestions.execute(query)
	}

	static async UpdatePastQuestion (req: Request) {
		const isObjective = req.body.type === PastQuestionType.objective
		const isTheory = req.body.type === PastQuestionType.theory

		const {
			institutionId,
			courseId,
			year,
			type,
			question,
			questionMedia,
			answer,
			answerMedia,
			correctIndex,
			options,
			optionsMedia,
			explanation,
			explanationMedia
		} = validate({
			institutionId: req.body.institutionId,
			courseId: req.body.courseId,
			year: req.body.year,
			type: req.body.type,
			question: req.body.question,
			questionMedia: req.body.questionMedia,

			answer: req.body.answer,
			answerMedia: req.body.answerMedia,
			correctIndex: req.body.correctIndex,
			options: req.body.options,
			optionsMedia: req.body.optionsMedia,
			explanation: req.body.explanation,
			explanationMedia: req.body.explanationMedia
		}, {
			institutionId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courseId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			year: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(PastQuestionType), (cur, val) => cur === val)]
			},
			question: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},

			answer: { required: false, rules: [Validation.isRequiredIfX(isTheory), Validation.isString] },
			answerMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(isTheory), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},

			correctIndex: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isNumber, Validation.isMoreThanX(-1), Validation.isLessThanX(req.body.options.length ?? 0)]
			},
			options: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: false,
				rules: [
					Validation.isRequiredIfX(isObjective),
					Validation.hasLessThanX(req.body.options.length + 1), Validation.hasMoreThanX(req.body.options.length - 1),
					Validation.isArrayOfX((option: any) => Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: false, rules: [Validation.isRequiredIfX(isObjective), Validation.isString] },
			explanationMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})

		const data = {
			institutionId, courseId, year, question, questionMedia,
			data: isObjective ? {
				type, correctIndex, options, optionsMedia, explanation, explanationMedia
			} : isTheory ? {
				type, answer, answerMedia
			} : {} as any
		}

		const updatedPastQuestion = await UpdatePastQuestion.execute({ id: req.params.id, data })

		if (updatedPastQuestion) return updatedPastQuestion
		throw new NotAuthorizedError()
	}

	static async CreatePastQuestion (req: Request) {
		const isObjective = req.body.type === PastQuestionType.objective
		const isTheory = req.body.type === PastQuestionType.theory

		const {
			institutionId,
			courseId,
			year,
			type,
			question,
			questionMedia,
			answer,
			answerMedia,
			correctIndex,
			options,
			optionsMedia,
			explanation,
			explanationMedia
		} = validate({
			institutionId: req.body.institutionId,
			courseId: req.body.courseId,
			year: req.body.year,
			type: req.body.type,
			question: req.body.question,
			questionMedia: req.body.questionMedia,

			answer: req.body.answer,
			answerMedia: req.body.answerMedia,
			correctIndex: req.body.correctIndex,
			options: req.body.options,
			optionsMedia: req.body.optionsMedia,
			explanation: req.body.explanation,
			explanationMedia: req.body.explanationMedia
		}, {
			institutionId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courseId: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			year: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(PastQuestionType), (cur, val) => cur === val)]
			},
			question: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},

			answer: { required: false, rules: [Validation.isRequiredIfX(isTheory), Validation.isString] },
			answerMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(isTheory), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},

			correctIndex: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isNumber, Validation.isMoreThanX(-1), Validation.isLessThanX(req.body.options.length ?? 0)]
			},
			options: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: false,
				rules: [
					Validation.isRequiredIfX(isObjective),
					Validation.hasLessThanX(req.body.options.length + 1), Validation.hasMoreThanX(req.body.options.length - 1),
					Validation.isArrayOfX((option: any) => Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: false, rules: [Validation.isRequiredIfX(isObjective), Validation.isString] },
			explanationMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})

		const data = {
			institutionId, courseId, year, question, questionMedia,
			data: isObjective ? {
				type, correctIndex, options, optionsMedia, explanation, explanationMedia
			} : isTheory ? {
				type, answer, answerMedia
			} : {} as any
		}

		return await AddPastQuestion.execute(data)
	}

	static async DeletePastQuestion (req: Request) {
		const isDeleted = await DeletePastQuestion.execute(req.params.id)
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}