import { AnnouncementsUseCases, ClassesUseCases, ClassUsers } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'

export class AnnouncementController {
	static async FindAnnouncement (req: Request) {
		return await AnnouncementsUseCases.find({
			id: req.params.id,
			classId: req.params.classId,
			userId: req.authUser!.id
		})
	}

	static async GetAnnouncement (req: Request) {
		const query = req.query as QueryParams
		query.auth = [{ field: 'classId', value: req.params.classId }, {
			field: 'users.members',
			value: req.authUser!.id
		}]
		return await AnnouncementsUseCases.get(query)
	}

	static async UpdateAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const { body } = validate({
			body: req.body.body
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] }
		})

		const data = { body }

		const updatedAnnouncement = await AnnouncementsUseCases.update({
			id: req.params.id,
			classId: req.params.classId,
			userId: authUserId,
			data
		})

		if (updatedAnnouncement) return updatedAnnouncement
		throw new NotAuthorizedError()
	}

	static async CreateAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const { body, classId } = validate({
			body: req.body.body,
			classId: req.params.classId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			classId: { required: true, rules: [Validation.isString] }
		})

		const classInst = await ClassesUseCases.find(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		const data = {
			body, classId, user: user.getEmbedded(),
			users: classInst.users
		}

		return await AnnouncementsUseCases.add(data)
	}

	static async DeleteAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await AnnouncementsUseCases.delete({
			id: req.params.id,
			userId: authUserId,
			classId: req.params.classId
		})
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}