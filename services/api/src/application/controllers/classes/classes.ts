import { ClassesUseCases } from '@modules/classes'
import { UsersUseCases } from '@modules/users'
import {
	BadRequestError,
	Conditions,
	NotAuthorizedError,
	QueryParams,
	Request,
	validate,
	Validation
} from '@utils/commons'
import { ClassUsers } from '@modules/classes/domain/types'
import { UploaderUseCases } from '@modules/storage'
import { DepartmentsUseCases } from '@modules/school'

export class ClassController {
	static async FindClass (req: Request) {
		return await ClassesUseCases.find(req.params.id)
	}

	static async GetClass (req: Request) {
		const query = req.query as QueryParams
		return await ClassesUseCases.get(query)
	}

	static async UpdateClass (req: Request) {
		const authUserId = req.authUser!.id
		const uploadedPhoto = req.files.photo?.[0] ?? null
		const changedPhoto = !!uploadedPhoto || req.body.photo === null
		const data = validate({
			name: req.body.name,
			description: req.body.description,
			courses: [...new Set<string>(req.body.courses)].filter((c) => c),
			photo: uploadedPhoto as any
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			description: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courses: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			photo: { required: true, nullable: true, rules: [Validation.isNotTruncated, Validation.isImage] }
		})

		const { name, description, courses } = data
		if (uploadedPhoto) data.photo = await UploaderUseCases.upload('classes/photos', uploadedPhoto)
		const validateData = {
			name, description, courses,
			...(changedPhoto ? { photo: data.photo } : {})
		}

		const updatedClass = await ClassesUseCases.update({ id: req.params.id, userId: authUserId, data: validateData })

		if (updatedClass) return updatedClass
		throw new NotAuthorizedError()
	}

	static async CreateClass (req: Request) {
		const authUserId = req.authUser!.id
		const user = await UsersUseCases.find(authUserId)
		if (!user) throw new BadRequestError('user not found')

		const { name, departmentId, description, courses, photo: classPhoto } = validate({
			name: req.body.name,
			departmentId: req.body.school?.departmentId,
			description: req.body.description,
			courses: [...new Set<string>(req.body.courses)].filter((c) => c),
			photo: req.files.photo?.[0] ?? null
		}, {
			name: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			departmentId: { required: true, rules: [Validation.isString] },
			description: { required: true, rules: [Validation.isString, Validation.isLongerThanX(2)] },
			courses: {
				required: true,
				rules: [Validation.isArrayOfX((cur) => Validation.isString(cur).valid, 'strings')]
			},
			photo: { required: true, nullable: true, rules: [Validation.isImage] }
		})

		const photo = classPhoto ? await UploaderUseCases.upload('classes/photos', classPhoto) : null
		const department = await DepartmentsUseCases.find(departmentId)
		if (!department) throw new BadRequestError('department not found')

		return await ClassesUseCases.add({
			name, description, photo,
			school: {
				departmentId: department.id,
				facultyId: department.facultyId,
				institutionId: department.institutionId
			},
			user: user.getEmbedded(), courses
		})
	}

	static async DeleteClass (req: Request) {
		const authUserId = req.authUser!.id
		const isDeleted = await ClassesUseCases.delete({ id: req.params.id, userId: authUserId })
		if (isDeleted) return isDeleted
		throw new NotAuthorizedError()
	}

	static async RequestClass (req: Request) {
		const { request } = validate({
			request: req.body.request
		}, {
			request: { required: true, rules: [Validation.isBoolean] }
		})

		const requested = await ClassesUseCases.requestClass({
			classId: req.params.id,
			userId: req.authUser!.id,
			request
		})
		if (requested) return requested
		throw new NotAuthorizedError()
	}

	static async LeaveClass (req: Request) {
		const left = await ClassesUseCases.leaveClass({
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

		const accepted = await ClassesUseCases.acceptRequest({
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

		if (add) {
			const { results: users } = await UsersUseCases.get({
				where: [{ field: 'id', value: userIds, condition: Conditions.in }],
				all: true
			})
			const allUserIds = users.map((user) => user.id)
			if (allUserIds.length !== userIds) throw new BadRequestError('user profiles not found')
		}

		const added = await ClassesUseCases.addMembers({
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

		const added = await ClassesUseCases.changeMemberRole({
			classId: req.params.id,
			adminId: req.authUser!.id,
			userId, add, role
		})
		if (added) return added
		throw new NotAuthorizedError()
	}
}