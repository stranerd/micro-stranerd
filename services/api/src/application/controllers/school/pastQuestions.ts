import { CoursesUseCases, PastQuestionsUseCases, PastQuestionType } from '@modules/school'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/app/package'

export class PastQuestionController {
	static async FindPastQuestion (req: Request) {
		return await PastQuestionsUseCases.find(req.params.id)
	}

	static async GetPastQuestion (req: Request) {
		const query = req.query as QueryParams
		return await PastQuestionsUseCases.get(query)
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
			courseId: { required: true, rules: [Validation.isString(), Validation.isMinOf(3)] },
			year: { required: true, rules: [Validation.isNumber(), Validation.isMoreThan(0)] },
			type: {
				required: true,
				rules: [Validation.isString(), Validation.arrayContains(Object.values(PastQuestionType), (cur, val) => cur === val)]
			},
			question: { required: true, rules: [Validation.isString(), Validation.isMinOf(3, true)] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')]
			},

			answer: {
				required: !isObjective,
				rules: [Validation.isString()]
			},
			answerMedia: {
				required: !isObjective,
				rules: [Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')]
			},

			correctIndex: {
				required: isObjective,
				rules: [Validation.isNumber(), Validation.isMoreThanOrEqualTo(0), Validation.isLessThan(req.body.options?.length ?? 0)]
			},
			options: {
				required: isObjective,
				rules: [Validation.isArrayOf((cur) => Validation.isString()(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: isObjective,
				rules: [
					Validation.hasMaxOf(req.body.options?.length ?? 0), Validation.hasMinOf(req.body.options?.length ?? 0),
					Validation.isArrayOf((option: any) => Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: isObjective, rules: [Validation.isString()] },
			explanationMedia: {
				required: isObjective,
				rules: [Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')]
			}
		})
		const course = await CoursesUseCases.find(courseId)
		if (!course) throw new BadRequestError('course not found')

		const data = {
			institutionId: course.institutionId, courseId, year, question, questionMedia,
			data: isObjective ? {
				type, correctIndex, options, optionsMedia, explanation, explanationMedia
			} : { type, answer, answerMedia }
		}

		const updatedPastQuestion = await PastQuestionsUseCases.update({ id: req.params.id, data })

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
			courseId: { required: true, rules: [Validation.isString(), Validation.isMinOf(3)] },
			year: { required: true, rules: [Validation.isNumber(), Validation.isMoreThan(0)] },
			type: {
				required: true,
				rules: [Validation.isString(), Validation.arrayContains(Object.values(PastQuestionType), (cur, val) => cur === val)]
			},
			question: { required: true, rules: [Validation.isString(), Validation.isMinOf(3, true)] },
			questionMedia: {
				required: true,
				rules: [Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')]
			},

			answer: {
				required: !isObjective,
				rules: [Validation.isString()]
			},
			answerMedia: {
				required: !isObjective,
				rules: [Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')]
			},

			correctIndex: {
				required: isObjective,
				rules: [Validation.isNumber(), Validation.isMoreThanOrEqualTo(0), Validation.isLessThan(req.body.options?.length ?? 0)]
			},
			options: {
				required: isObjective,
				rules: [Validation.isArrayOf((cur) => Validation.isString()(cur).valid, 'strings')]
			},
			optionsMedia: {
				required: isObjective,
				rules: [
					Validation.hasMaxOf(req.body.options?.length ?? 0), Validation.hasMinOf(req.body.options?.length ?? 0),
					Validation.isArrayOf((option: any) => Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')(option).valid, 'array of images')
				]
			},
			explanation: { required: isObjective, rules: [Validation.isString()] },
			explanationMedia: {
				required: isObjective,
				rules: [Validation.isArrayOf((cur: any) => Validation.isImage()(cur).valid, 'images')]
			}
		})
		const course = await CoursesUseCases.find(courseId)
		if (!course) throw new BadRequestError('course not found')

		const data = {
			institutionId: course.institutionId, courseId, year, question, questionMedia,
			data: isObjective ? {
				type, correctIndex, options, optionsMedia, explanation, explanationMedia
			} : { type, answer, answerMedia }
		}

		return await PastQuestionsUseCases.add(data)
	}

	static async DeletePastQuestion (req: Request) {
		const isDeleted = await PastQuestionsUseCases.delete(req.params.id)
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}