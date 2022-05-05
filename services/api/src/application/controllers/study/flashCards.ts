import { FlashCardsUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class FlashCardController {
	static async FindFlashCard (req: Request) {
		return await FlashCardsUseCases.find(req.params.id)
	}

	static async GetFlashCard (req: Request) {
		const query = req.query as QueryParams
		return await FlashCardsUseCases.get(query)
	}

	static async UpdateFlashCard (req: Request) {
		const data = validate({
			title: req.body.title,
			set: req.body.set
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			set: {
				required: true,
				rules: [
					Validation.isArrayOfX((cur: any) => Validation.isString(cur?.question).valid && Validation.isString(cur?.answer).valid, 'questions'),
					Validation.hasMoreThanX(0)
				]
			}
		})

		const authUserId = req.authUser!.id

		const updatedFlashCard = await FlashCardsUseCases.update({ id: req.params.id, userId: authUserId, data })
		if (updatedFlashCard) return updatedFlashCard
		throw new NotAuthorizedError()
	}

	static async CreateFlashCard (req: Request) {
		const data = validate({
			title: req.body.title,
			set: req.body.set
		}, {
			title: { required: true, rules: [Validation.isString, Validation.isLongerThanX(0)] },
			set: {
				required: true,
				rules: [
					Validation.isArrayOfX((cur: any) => Validation.isString(cur?.question).valid && Validation.isString(cur?.answer).valid, 'questions'),
					Validation.hasMoreThanX(0)
				]
			}
		})

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user) throw new BadRequestError('user not found')
		return await FlashCardsUseCases.add({ ...data, user: user.getEmbedded() })
	}

	static async DeleteFlashCard (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FlashCardsUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}