import {
	AcceptClassRequest,
	AddClass,
	AddClassMembers,
	ChangeClassMemberRole,
	DeleteClass,
	FindClass,
	GetClasses,
	LeaveClass,
	RequestToJoinClass,
	UpdateClass
} from '@modules/classes'
import { FindUser } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { ClassUsers } from '@modules/classes/domain/types'

export class ClassController {
	static async FindClass (req: Request) {
		return await FindClass.execute(req.params.id)
	}

	static async GetClass (req: Request) {
		const query = req.query as QueryParams
		return await GetClasses.execute(query)
	}

	static async UpdateClass (req: Request) {
		const authUserId = req.authUser!.id
		const { name, description, photo, coverPhoto } = validate({
			name: req.body.name,
			description: req.body.description,
			photo: req.body.photo,
			coverPhoto: req.body.coverPhoto
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			photo: { required: false, rules: [Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isImage] }
		})

		const data = { name, description, photo, coverPhoto }

		const updatedClass = await UpdateClass.execute({ id: req.params.id, userId: authUserId, data })

		if (updatedClass) return updatedClass
		throw new NotAuthorizedError()
	}

	static async CreateClass (req: Request) {
		const authUserId = req.authUser!.id
		const user = await FindUser.execute(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const { name, description, photo, coverPhoto } = validate({
			name: req.body.name,
			description: req.body.description,
			photo: req.body.photo,
			coverPhoto: req.body.coverPhoto
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			photo: { required: false, rules: [Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isImage] }
		})

		const data = {
			name, description, photo, coverPhoto,
			userId: user.id,
			userBio: user.bio,
			userRoles: user.roles
		}

		return await AddClass.execute(data)
	}

	static async DeleteClass (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await DeleteClass.execute({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async RequestClass (req: Request) {
		const { request } = validate({
			request: req.body.request
		}, {
			request: { required: true, rules: [Validation.isBoolean] }
		})

		const requested = await RequestToJoinClass.execute({
			classId: req.params.id,
			userId: req.authUser!.id,
			request
		})
		if (requested) return requested
		throw new NotAuthorizedError()
	}

	static async LeaveClass (req: Request) {
		const left = await LeaveClass.execute({
			classId: req.params.id,
			userId: req.authUser!.id
		})
		if (left) return left
		throw new NotAuthorizedError()
	}

	static async AcceptRequest (req: Request) {
		const { accept, userId } = validate({
			accept: req.body.accept,
			userId: req.body.userId
		}, {
			accept: { required: true, rules: [Validation.isBoolean] },
			userId: { required: true, rules: [Validation.isString] }
		})

		const accepted = await AcceptClassRequest.execute({
			classId: req.params.id,
			adminId: req.authUser!.id,
			requestId: userId, accept
		})
		if (accepted) return accepted
		throw new NotAuthorizedError()
	}

	static async AddMembers (req: Request) {
		const { add, userIds } = validate({
			add: req.body.add,
			userIds: req.body.userIds
		}, {
			add: { required: true, rules: [Validation.isBoolean] },
			userIds: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings'), Validation.hasMoreThanX(0)]
			}
		})

		const added = await AddClassMembers.execute({
			classId: req.params.id,
			adminId: req.authUser!.id,
			userIds, add
		})
		if (added) return added
		throw new NotAuthorizedError()
	}

	static async ChangeMemberRole (req: Request) {
		const { add, userId, role } = validate({
			add: req.body.add,
			userId: req.body.userId,
			role: req.body.role
		}, {
			add: { required: true, rules: [Validation.isBoolean] },
			userId: { required: true, rules: [Validation.isString] },
			role: {
				required: true,
				rules: [Validation.arrayContainsX(Object.values(ClassUsers), (cur, val) => cur === val)]
			}
		})

		const added = await ChangeClassMemberRole.execute({
			classId: req.params.id,
			adminId: req.authUser!.id,
			userId, add, role
		})
		if (added) return added
		throw new NotAuthorizedError()
	}
}