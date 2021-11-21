import {
	AddTest,
	FindTest,
	FindTestPrep,
	GetPastQuestions,
	GetTests,
	PastQuestionType,
	TestType,
	UpdateTest,
	UpdateTestAnswer
} from '@modules/study'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { getRandomN } from '@utils/functions'

export class TestController {
	static async FindTest (req: Request) {
		return await FindTest.execute({ id: req.params.id, userId: req.authUser!.id })
	}

	static async GetTests (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await GetTests.execute(query)
	}

	static async CreateTest (req: Request) {
		const isTimed = req.body.type === TestType.timed
		const isUnTimed = req.body.type === TestType.unTimed

		const { prepId, type } = validate({
			prepId: req.body.prepId,
			type: req.body.type
		}, {
			prepId: { required: true, rules: [Validation.isString] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.keys(TestType), (cur, val) => cur === val)]
			}
		})

		const prep = await FindTestPrep.execute(prepId)
		if (!prep) throw new NotFoundError()
		const { results } = await GetPastQuestions.execute({
			where: [
				{ field: 'data.type', value: PastQuestionType.objective },
				{ field: 'institutionId', value: prep.data.institutionId },
				{ field: 'courseId', value: prep.data.courseId },
				{ field: 'year', value: prep.data.year }
			],
			all: true
		})
		const questions = getRandomN(results, prep.questions).map((q) => q.id)

		const data = {
			score: 0, questions, answers: {}, prepId, userId: req.authUser!.id, done: false,
			data: isTimed ? { type, time: prep.time } : isUnTimed ? { type } : ({} as any)
		}

		return await AddTest.execute(data)
	}

	static async UpdateAnswer (req: Request) {
		const data = validate({
			questionId: req.body.questionId,
			answer: req.body.answer
		}, {
			questionId: { required: true, rules: [Validation.isString] },
			answer: { required: true, rules: [Validation.isNumber] }
		})

		const updated = await UpdateTestAnswer.execute({
			id: req.params.id,
			userId: req.authUser!.id,
			questionId: data.questionId,
			answer: data.answer
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async MarkTestDone (req: Request) {
		const updated = await UpdateTest.execute({
			id: req.params.id,
			userId: req.authUser!.id,
			data: { done: true }
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}
}