import { FlashCardsUseCases } from '@modules/study'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, Schema, validateReq } from '@utils/app/package'

export class FlashCardController {
	static async FindFlashCard(req: Request) {
		return await FlashCardsUseCases.find(req.params.id)
	}

	static async GetFlashCard(req: Request) {
		const query = req.query as QueryParams
		return await FlashCardsUseCases.get(query)
	}

	static async UpdateFlashCard(req: Request) {
		const data = validateReq({
			title: Schema.string().min(1),
			set: Schema.array(Schema.object({
				question: Schema.string().min(1),
				answer: Schema.string().min(1)
			})).min(1).max(128)
		}, req.body)

		const authUserId = req.authUser!.id

		const updatedFlashCard = await FlashCardsUseCases.update({ id: req.params.id, userId: authUserId, data })
		if (updatedFlashCard) return updatedFlashCard
		throw new NotAuthorizedError()
	}

	static async CreateFlashCard(req: Request) {
		const data = validateReq({
			title: Schema.string().min(1),
			set: Schema.array(Schema.object({
				question: Schema.string().min(1),
				answer: Schema.string().min(1)
			})).min(1).max(128)
		}, req.body)

		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')
		return await FlashCardsUseCases.add({ ...data, user: user.getEmbedded() })
	}

	static async DeleteFlashCard(req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await FlashCardsUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async SaveMatch(req: Request) {
		const data = validateReq({
			time: Schema.number().gt(0)
		}, req.body)

		return await FlashCardsUseCases.saveMatch({
			userId: req.authUser!.id,
			flashCardId: req.params.id,
			time: data.time
		})
	}
}