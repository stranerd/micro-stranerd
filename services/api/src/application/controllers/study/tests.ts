import { PastQuestionsUseCases } from '@modules/school'
import { TestPrepsUseCases, TestsUseCases, TestType } from '@modules/study'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, Schema, validateReq, Validation } from '@utils/app/package'

export class TestController {
	static async FindTest(req: Request) {
		const test = await TestsUseCases.find(req.params.id)
		if (!test || test.userId !== req.authUser!.id) return null
		return test
	}

	static async GetTests(req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'userId', value: req.authUser!.id }]
		return await TestsUseCases.get(query)
	}

	static async CreateTest(req: Request) {
		const data = validateReq({
			name: Schema.string().min(1),
			prepId: Schema.string().min(1),
			data: Schema.or([
				Schema.object({
					type: Schema.any<TestType.unTimed>().eq(TestType.unTimed)
				}),
				Schema.object({
					type: Schema.any<TestType.timed>().eq(TestType.timed),
					time: Schema.number().gt(0)
				})
			])
		}, req.body)

		const prep = await TestPrepsUseCases.find(data.prepId)
		if (!prep) throw new BadRequestError('test prep not found')
		const { results } = await PastQuestionsUseCases.get({
			where: [
				{ field: 'data.type', value: prep.data.questionType },
				{ field: 'institutionId', value: prep.data.institutionId },
				{ field: 'courseId', value: prep.data.courseId },
				{ field: 'year', value: prep.data.year }
			],
			all: true
		})
		if (results.length < prep.questions) throw new BadRequestError('Not enough questions to take this test')
		const questions = Validation.getRandomSample(results, data.data.type === TestType.unTimed ? results.length : prep.questions).map((q) => q.id)


		return await TestsUseCases.add({
			...data, questionType: prep.data.questionType,
			score: 0, questions, answers: {}, userId: req.authUser!.id, done: false
		})
	}

	static async UpdateAnswer(req: Request) {
		const data = validateReq({
			questionId: Schema.string().min(1),
			answer: Schema.or([Schema.string(), Schema.number()])
		}, req.body)

		const updated = await TestsUseCases.updateAnswer({
			id: req.params.id,
			userId: req.authUser!.id,
			questionId: data.questionId,
			answer: data.answer
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}

	static async MarkTestDone(req: Request) {
		const updated = await TestsUseCases.update({
			id: req.params.id,
			userId: req.authUser!.id,
			data: { done: true }
		})

		if (updated) return updated
		throw new NotAuthorizedError()
	}
}