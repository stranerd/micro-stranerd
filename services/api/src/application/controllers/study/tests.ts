import { TestPrepsUseCases, TestsUseCases, TestType } from '@modules/study'
import { GetPastQuestions } from '@modules/school'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { getRandomN } from '@utils/functions'

export class TestController {
	static async FindTest (req: Request) {
		return await TestsUseCases.find({ id: req.params.id, userId: req.authUser!.id })
	}

	static async GetTests (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await TestsUseCases.get(query)
	}

	static async CreateTest (req: Request) {
		const isTimed = req.body.data?.type === TestType.timed
		const isUnTimed = req.body.data?.type === TestType.unTimed

		const { name, prepId, type, time } = validate({
			name: req.body.name,
			prepId: req.body.prepId,
			type: req.body.data?.type,
			time: req.body.data?.time
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			prepId: { required: true, rules: [Validation.isString] },
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(TestType), (cur, val) => cur === val)]
			},
			time: {
				required: isTimed,
				rules: [Validation.isNumber, Validation.isMoreThanX(0)]
			}
		})

		const prep = await TestPrepsUseCases.find(prepId)
		if (!prep) throw new BadRequestError('test prep not found')
		const { results } = await GetPastQuestions.execute({
			where: [
				{ field: 'data.type', value: prep.data.questionType },
				{ field: 'institutionId', value: prep.data.institutionId },
				{ field: 'courseId', value: prep.data.courseId },
				{ field: 'year', value: prep.data.year }
			],
			all: true
		})
		if (results.length < prep.questions) throw new BadRequestError('Not enough questions to take this test')
		const questions = getRandomN(results, isUnTimed ? results.length : prep.questions).map((q) => q.id)

		const data = {
			name, score: 0, questions, answers: {}, prepId, userId: req.authUser!.id, done: false,
			questionType: prep.data.questionType,
			data: isTimed ? { type, time } : isUnTimed ? { type } : ({} as any)
		}

		return await TestsUseCases.add(data)
	}

	static async UpdateAnswer (req: Request) {
		const data = validate({
			questionId: req.body.questionId,
			answer: req.body.answer
		}, {
			questionId: { required: true, rules: [Validation.isString] },
			answer: { required: true, rules: [] }
		})

		const updated = await TestsUseCases.updateAnswer({
			id: req.params.id,
			userId: req.authUser!.id,
			questionId: data.questionId,
			answer: data.answer
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async MarkTestDone (req: Request) {
		const updated = await TestsUseCases.update({
			id: req.params.id,
			userId: req.authUser!.id,
			data: { done: true }
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}
}