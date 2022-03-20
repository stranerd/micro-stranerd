import {
	AddPastQuestion,
	DeletePastQuestion,
	FindCourse,
	FindPastQuestion,
	GetPastQuestions,
	PastQuestionType,
	UpdatePastQuestion
} from '@modules/school'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class PastQuestionController {
	static async FindPastQuestion (req: Request) {
		return await FindPastQuestion.execute(req.params.id)
	}

	static async GetPastQuestion (req: Request) {
		const query = req.query as QueryParams
		return await GetPastQuestions.execute(query)
	}

	static async UpdatePastQuestion (req: Request) {
		const isObjective = req.body.data?.type === PastQuestionType.objective

		const {
			courseId, year, type, question, questionMedia,
			answer, answerMedia,
			correctIndex, options, optionsMedia, explanation, explanationMedia
		} = validate({
			courseId: req.body.courseId,
			year: req.body.year,
			question: req.body.question,
			questionMedia: req.body.questionMedia,

			answer: req.body.data?.answer,
			type: req.body.data?.type,
			answerMedia: req.body.data?.answerMedia,
			correctIndex: req.body.data?.correctIndex,
			options: req.body.data?.options,
			optionsMedia: req.body.data?.optionsMedia,
			explanation: req.body.data?.explanation,
			explanationMedia: req.body.data?.explanationMedia
		}, {
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

			answer: {
				required: false,
				rules: [Validation.isRequiredIfX(!isObjective), Validation.isString]
			},
			answerMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(!isObjective), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},

			correctIndex: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isNumber, Validation.isMoreThanX(-1), Validation.isLessThanX(req.body.options?.length ?? 0)]
			},
			options: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: false,
				rules: [
					Validation.isRequiredIfX(isObjective),
					Validation.hasLessThanX((req.body.options?.length ?? 0) + 1), Validation.hasMoreThanX((req.body.options?.length ?? 0) - 1),
					Validation.isArrayOfX((option: any) => Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: false, rules: [Validation.isRequiredIfX(isObjective), Validation.isString] },
			explanationMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})
		const course = await FindCourse.execute(courseId)
		if (!course) throw new BadRequestError('course not found')

		const data = {
			institutionId: course.institutionId, courseId, year, question, questionMedia,
			data: isObjective ? {
				type, correctIndex, options, optionsMedia, explanation, explanationMedia
			} : { type, answer, answerMedia }
		}

		const updatedPastQuestion = await UpdatePastQuestion.execute({ id: req.params.id, data })

		if (updatedPastQuestion) return updatedPastQuestion
		throw new BadRequestError('past question not found')
	}

	static async CreatePastQuestion (req: Request) {
		const isObjective = req.body.data?.type === PastQuestionType.objective

		const {
			courseId, year, type, question, questionMedia,
			answer, answerMedia,
			correctIndex, options, optionsMedia, explanation, explanationMedia
		} = validate({
			courseId: req.body.courseId,
			year: req.body.year,
			question: req.body.question,
			questionMedia: req.body.questionMedia,

			answer: req.body.data?.answer,
			type: req.body.data?.type,
			answerMedia: req.body.data?.answerMedia,
			correctIndex: req.body.data?.correctIndex,
			options: req.body.data?.options,
			optionsMedia: req.body.data?.optionsMedia,
			explanation: req.body.data?.explanation,
			explanationMedia: req.body.data?.explanationMedia
		}, {
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

			answer: {
				required: false,
				rules: [Validation.isRequiredIfX(!isObjective), Validation.isString]
			},
			answerMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(!isObjective), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			},

			correctIndex: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isNumber, Validation.isMoreThanX(-1), Validation.isLessThanX(req.body.options?.length ?? 0)]
			},
			options: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: false,
				rules: [
					Validation.isRequiredIfX(isObjective),
					Validation.hasLessThanX((req.body.options?.length ?? 0) + 1), Validation.hasMoreThanX((req.body.options?.length ?? 0) - 1),
					Validation.isArrayOfX((option: any) => Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: false, rules: [Validation.isRequiredIfX(isObjective), Validation.isString] },
			explanationMedia: {
				required: false,
				rules: [Validation.isRequiredIfX(isObjective), Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images')]
			}
		})
		const course = await FindCourse.execute(courseId)
		if (!course) throw newBadRequestError('course not found')

		const data = {
			institutionId: course.institutionId, courseId, year, question, questionMedia,
			data: isObjective ? {
				type, correctIndex, options, optionsMedia, explanation, explanationMedia
			} : { type, answer, answerMedia }
		}

		return await AddPastQuestion.execute(data)
	}

	static async DeletePastQuestion (req: Request) {
		const isDeleted = await DeletePastQuestion.execute(req.params.id)
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}