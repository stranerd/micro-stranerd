import { CoursesUseCases, PastQuestionType } from '@modules/school'
import { PrepType, TestPrepsUseCases } from '@modules/study'
import { BadRequestError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

export class TestPrepController {
	static async FindTestPrep(req: Request) {
		return await TestPrepsUseCases.find(req.params.id)
	}

	static async GetTestPreps(req: Request) {
		const query = req.query as QueryParams
		return await TestPrepsUseCases.get(query)
	}

	static async CreateTestPrep(req: Request) {
		const data = validateReq({
			name: Schema.string().min(1),
			questions: Schema.number().gt(0),
			time: Schema.number().gt(0),
			data: Schema.or([
				Schema.object({
					type: Schema.any<PrepType.pastQuestion>().eq(PrepType.pastQuestion),
					questionType: Schema.any<PastQuestionType>().in(Object.values(PastQuestionType)),
					courseId: Schema.string().min(1),
					year: Schema.number().gt(1)
				})
			])
		}, req.body)

		const course = await CoursesUseCases.find(data.data.courseId)
		if (!course) throw new BadRequestError('course not found')

		return await TestPrepsUseCases.add({
			...data, data: {
				...data.data,
				institutionId: course.institutionId
			}
		})
	}

	static async UpdateTestPrep(req: Request) {
		const data = validateReq({
			name: Schema.string().min(1),
			questions: Schema.number().gt(0),
			time: Schema.number().gt(0),
			data: Schema.or([
				Schema.object({
					type: Schema.any<PrepType.pastQuestion>().eq(PrepType.pastQuestion),
					questionType: Schema.any<PastQuestionType>().in(Object.values(PastQuestionType)),
					courseId: Schema.string().min(1),
					year: Schema.number().gt(1)
				})
			])
		}, req.body)

		const course = await CoursesUseCases.find(data.data.courseId)
		if (!course) throw new BadRequestError('course not found')

		const updatedTestPrep = await TestPrepsUseCases.update({
			id: req.params.id, data: {
				...data, data: {
					...data.data,
					institutionId: course.institutionId
				}
			}
		})
		if (updatedTestPrep) return updatedTestPrep
		throw new BadRequestError('test prep not found')
	}

	static async DeleteTestPrep(req: Request) {
		const isDeleted = await TestPrepsUseCases.delete(req.params.id)
		if (isDeleted) return isDeleted
		throw new BadRequestError('test prep not found')
	}
}