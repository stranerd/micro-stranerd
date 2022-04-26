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
import { UsersUseCases } from '@modules/users'
import { BadRequestError, NotAuthorizedError, QueryParams, Request, validate, Validation } from '@utils/commons'
import { ClassUsers } from '@modules/classes/domain/types'
import { UploaderUseCases } from '@modules/storage'

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
		const uploadedPhoto = req.files.photo?.[0]
		const uploadedCoverPhoto = req.files.coverPhoto?.[0]
		const changedPhoto = !!uploadedPhoto || req.body.photo === null
		const changedCoverPhoto = !!uploadedCoverPhoto || req.body.coverPhoto === null
		const data = validate({
			name: req.body.name,
			description: req.body.description,
			photo: uploadedPhoto as any,
			coverPhoto: uploadedCoverPhoto as any
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			photo: { required: false, rules: [Validation.isNotTruncated, Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isNotTruncated, Validation.isImage] }
		})

		const { name, description } = data
		if (uploadedPhoto) data.photo = await UploaderUseCases.upload('classes/photos', uploadedPhoto)
		if (uploadedCoverPhoto) data.coverPhoto = await UploaderUseCases.upload('classes/coverPhotos', uploadedCoverPhoto)
		const validateData = {
			name, description,
			...(changedPhoto ? { photo: data.photo } : {}),
			...(changedCoverPhoto ? { coverPhoto: data.coverPhoto } : {})
		}

		const updatedClass = await UpdateClass.execute({ id: req.params.id, userId: authUserId, data: validateData })

		if (updatedClass) return updatedClass
		throw new NotAuthorizedError()
	}

	static async CreateClass (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const { name, description, photo: classPhoto, coverPhoto: classCoverPhoto } = validate({
			name: req.body.name,
			description: req.body.description,
			photo: req.files.photo?.[0] ?? null,
			coverPhoto: req.files.coverPhoto?.[0] ?? null
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isExtractedHTMLLongerThanX(2)] },
			photo: { required: false, rules: [Validation.isImage] },
			coverPhoto: { required: false, rules: [Validation.isImage] }
		})

		const photo = classPhoto ? await UploaderUseCases.upload('classes/photos', classPhoto) : null
		const coverPhoto = classCoverPhoto ? await UploaderUseCases.upload('classes/coverPhotos', classCoverPhoto) : null

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