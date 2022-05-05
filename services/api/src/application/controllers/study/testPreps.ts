import { PrepType, TestPrepsUseCases } from '@modules/study'
import { CoursesUseCases, PastQuestionType } from '@modules/school'
import { BadRequestError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class TestPrepController {
	static async FindTestPrep (req: Request) {
		return await TestPrepsUseCases.find(req.params.id)
	}

	static async GetTestPreps (req: Request) {
		const query = req.query as QueryParams
		return await TestPrepsUseCases.get(query)
	}

	static async CreateTestPrep (req: Request) {
		const isPastQuestionsType = req.body.data?.type === PrepType.pastQuestion

		const { name, questions, time, type, questionType, courseId, year } = validate({
			name: req.body.name,
			questions: req.body.questions,
			time: req.body.time,
			type: req.body.data?.type,
			questionType: req.body.data?.questionType,
			courseId: req.body.data?.courseId,
			year: req.body.data?.year
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			questions: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			time: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(PrepType), (cur, val) => cur === val)]
			},
			questionType: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(PastQuestionType), (cur, val) => cur === val)]
			},
			courseId: {
				required: isPastQuestionsType,
				rules: [Validation.isString, Validation.isLongerThanX(0)]
			},
			year: {
				required: isPastQuestionsType,
				rules: [Validation.isNumber, Validation.isMoreThanX(0)]
			}
		})

		const course = await CoursesUseCases.find(courseId)
		if (!course) throw new BadRequestError('course not found')

		const data = {
			name, questions, time,
			data: isPastQuestionsType ? {
				type,
				questionType,
				courseId,
				year,
				institutionId: course.institutionId
			} : ({} as any)
		}

		return await TestPrepsUseCases.add(data)
	}

	static async UpdateTestPrep (req: Request) {
		const isPastQuestionsType = req.body.data?.type === PrepType.pastQuestion

		const { name, questions, time, type, questionType, courseId, year } = validate({
			name: req.body.name,
			questions: req.body.questions,
			time: req.body.time,
			type: req.body.data?.type,
			questionType: req.body.data?.questionType,
			courseId: req.body.data?.courseId,
			year: req.body.data?.year
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			questions: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			time: { required: true, rules: [Validation.isNumber, Validation.isMoreThanX(0)] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(PrepType), (cur, val) => cur === val)]
			},
			questionType: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(PastQuestionType), (cur, val) => cur === val)]
			},
			courseId: {
				required: isPastQuestionsType,
				rules: [Validation.isString, Validation.isLongerThanX(0)]
			},
			year: {
				required: isPastQuestionsType,
				rules: [Validation.isNumber, Validation.isMoreThanX(0)]
			}
		})

		const course = await CoursesUseCases.find(courseId)
		if (!course) throw new BadRequestError('course not found')

		const data = {
			name, questions, time,
			data: isPastQuestionsType ? {
				type,
				questionType,
				courseId,
				year,
				institutionId: course.institutionId
			} : ({} as any)
		}

		const updatedTestPrep = await TestPrepsUseCases.update({ id: req.params.id, data })
		if (updatedTestPrep) return updatedTestPrep
		throw new BadRequestError('test prep not found')
	}

	static async DeleteTestPrep (req: Request) {
		const isDeleted = await TestPrepsUseCases.delete(req.params.id)
		if (isDeleted) return isDeleted
		throw new BadRequestError('test prep not found')
	}
}