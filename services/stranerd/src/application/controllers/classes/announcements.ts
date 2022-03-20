import {
	AddAnnouncement,
	DeleteAnnouncement,
	FindAnnouncement,
	FindClass,
	GetAnnouncements,
	UpdateAnnouncement
} from '@modules/classes'
import { FindUser } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { ClassUsers } from '@modules/classes/domain/types'

export class AnnouncementController {
	static async FindAnnouncement (req: Request) {
		return await FindAnnouncement.execute(req.params.id)
	}

	static async GetAnnouncement (req: Request) {
		const query = req.query as QueryParams
		return await GetAnnouncements.execute(query)
	}

	static async UpdateAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const { body } = validate({
			body: req.body.body
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] }
		})

		const data = { body }

		const updatedAnnouncement = await UpdateAnnouncement.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedAnnouncement) return updatedAnnouncement
		throw new NotAuthorizedError()
	}

	static async CreateAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const { body, classId } = validate({
			body: req.body.body,
			classId: req.body.classId
		}, {
			body: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			classId: { required: true, rules: [Validation.isString] }
		})

		const classInst = await FindClass.execute(classId)
		if (!classInst) throw new BadRequestError('class not found')
		if (!classInst!.users[ClassUsers.admins].includes(authUserId)) throw new BadRequestError('not a class admin')

		const data = {
			body, classId,
			userId: authUserId,
			userBio: user.bio,
			userRoles: user.roles,
			users: classInst.users
		}

		return await AddAnnouncement.execute(data)
	}

	static async DeleteAnnouncement (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteAnnouncement.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}
}