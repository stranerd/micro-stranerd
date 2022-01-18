import {
	AddQuestion,
	DeleteQuestion,
	FindQuestion,
	GetQuestions,
	UpdateBestAnswer,
	UpdateQuestion
} from '@modules/questions'
import { FindUser } from '@modules/users'
import {
	NotAuthorizedError,
	NotFoundError,
	QueryParams,
	Request,
	validate,
	Validation,
	ValidationError
} from '@utils/commons'

export class QuestionController {
	static async FindQuestion (req: Request) {
		return await FindQuestion.execute(req.params.id)
	}

	static async GetQuestion (req: Request) {
		const query = req.query as QueryParams
		return await GetQuestions.execute(query)
	}

	static async UpdateQuestion (req: Request) {
		const data = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			tags: req.body.tags,
			attachments: req.body.attachments
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			subjectId: { required: true, rules: [Validation.isString] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			},
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const authUserId = req.authUser!.id

		const updatedQuestion = await UpdateQuestion.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)

		if (!user) throw new NotFoundError()

		const data = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			tags: req.body.tags,
			attachments: req.body.attachments
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			subjectId: { required: true, rules: [Validation.isString] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			},
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		return await AddQuestion.execute({
			...data,
			userBio: user.bio,
			userId: authUserId
		})
	}

	static async MarkBestAnswer (req: Request) {
		const authUserId = req.authUser!.id

		const { answerId } = validate({
			answerId: req.body.answerId
		}, {
			answerId: { required: true, rules: [Validation.isString] }
		})

		const question = await FindQuestion.execute(req.params.id)
		if (!question) throw new NotFoundError()
		if (question.userId !== authUserId) throw new NotAuthorizedError()
		if (question.isAnswered) throw new ValidationError([{
			field: 'answerId',
			messages: ['question is already answered']
		}])
		if (question.bestAnswers.find((a) => a.id === answerId)) throw new ValidationError([{
			field: 'answerId',
			messages: ['answer is already marked as a best answer']
		}])

		return await UpdateBestAnswer.execute({
			id: question.id,
			answerId,
			userId: authUserId,
			add: true
		})
	}

	static async DeleteQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteQuestion.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}