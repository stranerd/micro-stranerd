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
import { QuestionType } from '@modules/questions/domain/types'
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
		const isUsers = req.body.data?.type === QuestionType.users
		const isClasses = req.body.data?.type === QuestionType.classes

		const { body, subjectId, tags, attachments, type, classId } = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			tags: req.body.tags,
			attachments: req.body.attachments,
			type: req.body.data?.type,
			classId: req.body.data?.classId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			subjectId: { required: true, rules: [Validation.isString] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
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
		if (isClasses && !classInst) throw new NotFoundError()

		const data = {
			body, subjectId, tags, attachments,
			data: isClasses ? {
				type,
				classId,
				className: classInst!.name,
				classAvatar: classInst!.avatar
			} : isUsers ? { type } : ({} as any)
		}

		const updatedQuestion = await UpdateQuestion.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedQuestion) return updatedQuestion
		throw new NotAuthorizedError()
	}

	static async CreateQuestion (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		const isUsers = req.body.data?.type === QuestionType.users
		const isClasses = req.body.data?.type === QuestionType.classes

		if (!user) throw new NotFoundError()

		const { body, subjectId, tags, attachments, type, classId } = validate({
			body: req.body.body,
			subjectId: req.body.subjectId,
			tags: req.body.tags,
			attachments: req.body.attachments,
			type: req.body.data?.type,
			classId: req.body.data?.classId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			subjectId: { required: true, rules: [Validation.isString] },
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
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
		if (isClasses && !classInst) throw new NotFoundError()

		const data = {
			body, subjectId, tags, attachments,
			userId: authUserId,
			userBio: user.bio,
			userRoles: user.roles,
			data: isClasses ? {
				type,
				classId,
				className: classInst!.name,
				classAvatar: classInst!.avatar
			} : isUsers ? { type } : ({} as any)
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
		if (!question) throw new NotFoundError()
		if (question.userId !== authUserId) throw new NotAuthorizedError()
		if (question.isAnswered) throw new ValidationError([{
			field: 'answerId',
			messages: ['question is already answered']
		}])
		if (question.bestAnswers.find((a) => a === answerId)) throw new ValidationError([{
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