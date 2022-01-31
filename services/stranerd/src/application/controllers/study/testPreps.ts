import {
	AddTestPrep,
	DeleteTestPrep,
	FindTestPrep,
	GetTestPreps,
	PastQuestionType,
	PrepType,
	UpdateTestPrep
} from '@modules/study'
import { NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class TestPrepController {
	static async FindTestPrep (req: Request) {
		return await FindTestPrep.execute(req.params.id)
	}

	static async GetTestPreps (req: Request) {
		const query = req.query as QueryParams
		return await GetTestPreps.execute(query)
	}

	static async CreateTestPrep (req: Request) {
		const isPastQuestionsType = req.body.data?.type === PrepType.pastQuestion

		const { name, questions, time, type, questionType, courseId, year, institutionId } = validate({
			name: req.body.name,
			questions: req.body.questions,
			time: req.body.time,
			type: req.body.data?.type,
			questionType: req.body.data?.questionType,
			courseId: req.body.data?.courseId,
			year: req.body.data?.year,
			institutionId: req.body.data?.institutionId
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
				required: true,
				rules: [Validation.isRequiredIfX(isPastQuestionsType), Validation.isString, Validation.isLongerThanX(0)]
			},
			year: {
				required: true,
				rules: [Validation.isRequiredIfX(isPastQuestionsType), Validation.isNumber, Validation.isMoreThanX(0)]
			},
			institutionId: {
				required: true,
				rules: [Validation.isRequiredIfX(isPastQuestionsType), Validation.isString, Validation.isLongerThanX(0)]
			}
		})

		const data = {
			name, questions, time,
			data: isPastQuestionsType ? { type, questionType, courseId, year, institutionId } : ({} as any)
		}

		return await AddTestPrep.execute(data)
	}

	static async UpdateTestPrep (req: Request) {
		const isPastQuestionsType = req.body.data?.type === PrepType.pastQuestion

		const { name, questions, time, type, questionType, courseId, year, institutionId } = validate({
			name: req.body.name,
			questions: req.body.questions,
			time: req.body.time,
			type: req.body.data?.type,
			questionType: req.body.data?.questionType,
			courseId: req.body.data?.courseId,
			year: req.body.data?.year,
			institutionId: req.body.data?.institutionId
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
				required: true,
				rules: [Validation.isRequiredIfX(isPastQuestionsType), Validation.isString, Validation.isLongerThanX(0)]
			},
			year: {
				required: true,
				rules: [Validation.isRequiredIfX(isPastQuestionsType), Validation.isNumber, Validation.isMoreThanX(0)]
			},
			institutionId: {
				required: true,
				rules: [Validation.isRequiredIfX(isPastQuestionsType), Validation.isString, Validation.isLongerThanX(0)]
			}
		})

		const data = {
			name, questions, time,
			data: isPastQuestionsType ? { type, questionType, courseId, year, institutionId } : ({} as any)
		}

		return await UpdateTestPrep.execute({ id: req.params.id, data })
	}

	static async DeleteTestPrep (req: Request) {
		const isDeleted = await DeleteTestPrep.execute(req.params.id)

		if (isDeleted) return isDeleted
		throw new NotFoundError()
	}
}