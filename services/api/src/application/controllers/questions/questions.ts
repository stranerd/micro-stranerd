import {
	AddQuestion,
	DeleteQuestion,
	FindQuestion,
	GetQuestions,
	QuestionType,
	UpdateBestAnswer,
	UpdateQuestion
} from '@modules/questions'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { ClassEntity, FindClass } from '@modules/classes'

export class QuestionController {
	static async FindQuestion (req: Request) {
		return await FindQuestion.execute(req.params.id)
	}

	static async GetQuestion (req: Request) {
		const query = req.query as QueryParams
		return await GetQuestions.execute(query)
	}

	static async UpdateQuestion (req: Request) {
		const authUserId = req.authUser!.id

		const { body, subject, attachments } = validate({
			body: req.body.body,
			subject: req.body.subject,
			attachments: req.body.attachments
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			subject: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			}
		})

		const data = { body, subject, attachments }

		const updatedQuestion = await UpdateQuestion.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		const isUsers = req.body.data?.type === QuestionType.users
		const isClasses = req.body.data?.type === QuestionType.classes

		if (!user) throw new BadRequestError('user not found')

		const { body, subject, attachments, type, classId } = validate({
			body: req.body.body,
			subject: req.body.subject,
			attachments: req.body.attachments,
			type: req.body.data?.type,
			classId: req.body.data?.classId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			subject: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			attachments: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isImage(cur).valid, 'images'), Validation.hasLessThanX(6)]
			},
			type: {
				required: true,
				rules: [Validation.isString, Validation.arrayContainsX(Object.values(QuestionType), (cur, val) => cur === val)]
			},
			classId: { required: false, rules: [Validation.isRequiredIfX(isClasses), Validation.isString] }
		})

		let classInst = null as ClassEntity | null
		if (classId) classInst = await FindClass.execute(classId)
		if (isClasses && !classInst) throw new BadRequestError('class not found')
		if (isClasses && !classInst!.getAllUsers().includes(authUserId)) throw new BadRequestError('not a class member')

		const data = {
			body, subject, attachments,
			userId: authUserId,
			userBio: user.bio,
			userRoles: user.roles,
			data: isClasses ? { type, classId } : isUsers ? { type } : ({} as any)
		}

		return await AddQuestion.execute(data)
	}

	static async MarkBestAnswer (req: Request) {
		const authUserId = req.authUser!.id

		const { answerId } = validate({
			answerId: req.body.answerId
		}, {
			answerId: { required: true, rules: [Validation.isString] }
		})

		const question = await FindQuestion.execute(req.params.id)
		if (!question) throw new BadRequestError('question not found')
		if (question.userId !== authUserId) throw new NotAuthorizedError()
		if (question.isAnswered) throw new BadRequestError('question is already answered')
		if (question.bestAnswers.find((a) => a === answerId)) throw new BadRequestError('answer is already marked best answer')

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