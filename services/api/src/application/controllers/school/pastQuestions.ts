import { CoursesUseCases, PastQuestionsUseCases, PastQuestionType } from '@modules/school'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

export class PastQuestionController {
	static async FindPastQuestion(req: Request) {
		return await PastQuestionsUseCases.find(req.params.id)
	}

	static async GetPastQuestion(req: Request) {
		const query = req.query as QueryParams
		return await PastQuestionsUseCases.get(query)
	}

	static async UpdatePastQuestion(req: Request) {
		const data = validateReq({
			courseId: Schema.string().min(1),
			year: Schema.number().gt(0),
			question: Schema.string().min(3, true),
			questionMedia: Schema.array(Schema.file().image()),
			data: Schema.or([
				Schema.object({
					type: Schema.any<PastQuestionType.theory | PastQuestionType.practical | PastQuestionType.german>()
						.in([PastQuestionType.theory, PastQuestionType.practical, PastQuestionType.german], (cur, val) => cur === val),
					answer: Schema.string(),
					answerMedia: Schema.array(Schema.file().image()),
				}),
				Schema.object({
					type: Schema.any<PastQuestionType.objective>().eq(PastQuestionType.objective),
					correctIndex: Schema.number().gte(0).lt(req.body.options?.length ?? 0),
					options: Schema.array(Schema.string()),
					optionsMedia: Schema.array(Schema.array(Schema.file().image())),
					explanation: Schema.string(),
					explanationMedia: Schema.array(Schema.file().image()),
				}),
			])
		}, req.body)
		const course = await CoursesUseCases.find(data.courseId)
		if (!course) throw new BadRequestError('course not found')

		const updatedPastQuestion = await PastQuestionsUseCases.update({
			id: req.params.id,
			data: { ...data, institutionId: course.institutionId }
		})

		if (updatedPastQuestion) return updatedPastQuestion
		throw new BadRequestError('past question not found')
	}

	static async CreatePastQuestion(req: Request) {
		const data = validateReq({
			courseId: Schema.string().min(1),
			year: Schema.number().gt(0),
			question: Schema.string().min(3, true),
			questionMedia: Schema.array(Schema.file().image()),
			data: Schema.or([
				Schema.object({
					type: Schema.any<PastQuestionType.theory | PastQuestionType.practical | PastQuestionType.german>()
						.in([PastQuestionType.theory, PastQuestionType.practical, PastQuestionType.german], (cur, val) => cur === val),
					answer: Schema.string(),
					answerMedia: Schema.array(Schema.file().image()),
				}),
				Schema.object({
					type: Schema.any<PastQuestionType.objective>().eq(PastQuestionType.objective),
					correctIndex: Schema.number().gte(0).lt(req.body.options?.length ?? 0),
					options: Schema.array(Schema.string()),
					optionsMedia: Schema.array(Schema.array(Schema.file().image())),
					explanation: Schema.string(),
					explanationMedia: Schema.array(Schema.file().image()),
				}),
			])
		}, req.body)
		const course = await CoursesUseCases.find(data.courseId)
		if (!course) throw new BadRequestError('course not found')

		return await PastQuestionsUseCases.add({ ...data, institutionId: course.institutionId })
	}

	static async DeletePastQuestion(req: Request) {
		const isDeleted = await PastQuestionsUseCases.delete(req.params.id)
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}