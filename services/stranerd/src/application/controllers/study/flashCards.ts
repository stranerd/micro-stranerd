import { AddFlashCard, DeleteFlashCard, FindFlashCard, GetFlashCards, UpdateFlashCard } from '@modules/study'
import { FindUser } from '@modules/users'
import { NotAuthorizedError, NotFoundError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class FlashCardController {
	static async FindFlashCard (req: Request) {
		return await FindFlashCard.execute(req.params.id)
	}

	static async GetFlashCard (req: Request) {
		const query = req.query as QueryParams
		return await GetFlashCards.execute(query)
	}

	static async UpdateFlashCard (req: Request) {
		const data = validate({
			title: req.body.title,
			isPublic: req.body.isPublic,
			set: req.body.set,
			tags: req.body.tags
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			set: {
				required: true,
				rules: [
					Validation.isArrayOfX((cur: any) => Validation.isString(cur?.question).valid && Validation.isString(cur?.answer).valid, 'questions'),
					Validation.hasMoreThanX(0)
				]
			},
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			}
		})

		const authUserId = req.authUser!.id

		const updatedFlashCard = await UpdateFlashCard.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedFlashCard) return updatedFlashCard
		throw new NotAuthorizedError()
	}

	static async CreateFlashCard (req: Request) {
		const data = validate({
			title: req.body.title,
			isPublic: req.body.isPublic,
			set: req.body.set,
			tags: req.body.tags
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			isPublic: { required: true, rules: [Validation.isBoolean] },
			set: {
				required: true,
				rules: [
					Validation.isArrayOfX((cur: any) => Validation.isString(cur?.question).valid && Validation.isString(cur?.answer).valid, 'questions'),
					Validation.hasMoreThanX(0)
				]
			},
			tags: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0), Validation.hasLessThanX(4)]
			}
		})

		const authUserId = req.authUser!.id

		const user = await FindUser.execute(authUserId)

		if (user) return await AddFlashCard.execute({
			...data,
			userBio: user.bio,
			userId: authUserId
		})
		throw new NotFoundError()
	}

	static async DeleteFlashCard (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteFlashCard.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}