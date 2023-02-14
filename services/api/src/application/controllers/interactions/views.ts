import { InteractionEntities, ViewsUseCases } from '@modules/interactions'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/app/package'
import { UsersUseCases } from '@modules/users'
import { verifyInteractionEntity } from '@utils/modules/interactions'

export class ViewsController {
	static async getViews (req: Request) {
		const query = req.query as QueryParams
		return await ViewsUseCases.get(query)
	}

	static async findView (req: Request) {
		return await ViewsUseCases.find(req.params.id)
	}

	static async createView (req: Request) {
		const { entityType, entityId } = validate({
			body: req.body.body,
			entityType: req.body.entity?.type,
			entityId: req.body.entity?.id
		}, {
			body: { required: true, rules: [Validation.isString(), Validation.isMinOf(1)] },
			entityType: {
				required: true,
				rules: [Validation.isString(), Validation.arrayContains(Object.values(InteractionEntities), (cur, val) => cur === val)]
			},
			entityId: { required: true, rules: [Validation.isString()] }
		})

		await verifyInteractionEntity(entityType, entityId, 'views')
		const user = await UsersUseCases.find(req.authUser!.id)
		if (!user || user.isDeleted()) throw new BadRequestError('profile not found')

		return await ViewsUseCases.create({
			entity: { id: entityId, type: entityType },
			user: user.getEmbedded()
		})
	}

	static async deleteView (req: Request) {
		const isDeleted = await ViewsUseCases.delete({ id: req.params.id, userId: req.authUser!.id })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}