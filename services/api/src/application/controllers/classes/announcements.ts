import { AnnouncementsUseCases, ClassesUseCases, ClassUsers } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	NotAuthorizedError,
	QueryKeys,
	QueryParams,
	Request,
	Schema, validateReq
} from '@utils/app/package'

export class AnnouncementController {
	static async FindAnnouncement (req: Request) {
		const announcement = await AnnouncementsUseCases.find(req.params.id)
		if (!announcement || announcement.classId !== req.params.classId || !announcement.users.members.includes(req.authUser!.id)) return null
		return announcement
	}

	static async GetAnnouncement (req: Request) {
		const query = req.query as QueryParams
		query.authType = QueryKeys.and
		query.auth = [{ field: 'classId', value: req.params.classId },
			{ field: 'users.members', value: req.authUser!.id }]
		return await AnnouncementsUseCases.get(query)
	}

	static async CreateAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user || user.isDeleted()) throw new BadRequestError('user not found')

		const data = validateReq({
			body: Schema.string().min(3),
			classId: Schema.string().min(1),
			reminder: Schema.time().min(Date.now()).asStamp().nullable()
		}, { ...req.body, classId: req.params.classId })

		const classInst = await ClassesUseCases.find(data.classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		return await AnnouncementsUseCases.add({
			...data, user: user.getEmbedded(),
			users: classInst.users
		})
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

	static async MarkRead (req: Request) {
		return await AnnouncementsUseCases.markRead({
			classId: req.params.classId,
			userId: req.authUser!.id
		})
	}
}