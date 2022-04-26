import { IClassRepository } from '../../domain/irepositories/classes'
import { ClassMapper } from '../mappers/classes'
import { ClassFromModel, ClassToModel } from '../models/classes'
import { Class } from '../mongooseModels/classes'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../../domain/types'

export class ClassRepository implements IClassRepository {
	private static instance: ClassRepository
	private mapper: ClassMapper

	private constructor () {
		this.mapper = new ClassMapper()
	}

	static getInstance () {
		if (!ClassRepository.instance) ClassRepository.instance = new ClassRepository()
		return ClassRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<ClassFromModel>(Class, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: ClassToModel) {
		const classInstance = new Class(data)
		classInstance.users[ClassUsers.admins] = [data.userId]
		classInstance.users[ClassUsers.members] = [data.userId]
		return this.mapper.mapFrom(await classInstance.save())!
	}

	async find (id: string) {
		const classInstance = await Class.findById(id)
		return this.mapper.mapFrom(classInstance)
	}

	async update (id: string, userId: string, data: Partial<ClassToModel>) {
		const classInstance = await Class.findOneAndUpdate({
			_id: id,
			'users.admins': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(classInstance)
	}

	async updateClassesUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const classes = await Class.updateMany({ userId }, { $set: { userBio, userRoles } })
		return classes.acknowledged
	}

	async delete (id: string, userId: string) {
		const classInstance = await Class.findOneAndDelete({ _id: id, 'users.admins': userId })
		return !!classInstance
	}

	async requestClass (classId: string, userId: string, add: boolean) {
		const classInst = await Class.findOneAndUpdate({
			_id: classId,
			[`users.${ClassUsers.members}`]: { $nin: userId },
			requests: { [add ? '$nin' : '$in']: userId }
		}, {
			[add ? '$addToSet' : '$pull']: { requests: userId }
		})
		return !!classInst
	}

	async leaveClass (classId: string, userId: string) {
		const allObjects = Object.fromEntries(Object.values(ClassUsers).map((key) => [`users.${key}`, userId]))
		const classInst = await Class.findOneAndUpdate({
			_id: classId,
			[`users.${ClassUsers.members}`]: userId
		}, { $pull: allObjects })
		return !!classInst
	}

	async acceptRequest (classId: string, adminId: string, requestId: string, accept: boolean) {
		const classInst = await Class.findByIdAndUpdate({
			_id: classId,
			[`users.${ClassUsers.admins}`]: { $in: adminId },
			requests: { $in: requestId }
		}, {
			$pull: { requests: requestId },
			...(accept ? {
				$addToSet: { [`users.${ClassUsers.members}`]: requestId }
			} : {})
		})
		return !!classInst
	}

	async addMembers (classId: string, adminId: string, userIds: string[], add: boolean) {
		const classInst = await Class.findByIdAndUpdate({
			_id: classId,
			[`users.${ClassUsers.admins}`]: { $in: adminId }
		}, {
			[add ? '$addToSet' : '$pull']: {
				[`users.${ClassUsers.members}`]: {
					[add ? '$each' : '$in']: userIds
				}
			},
			...(add ? { $pull: { requests: { $in: userIds } } } : {})
		})
		return !!classInst
	}

	async changeMemberRole (classId: string, adminId: string, userId: string, role: ClassUsers, add: boolean) {
		const classInst = await Class.findByIdAndUpdate({
			_id: classId, userId: adminId
		}, {
			[add ? '$addToSet' : '$pull']: {
				[`users.${role}`]: userId
			}
		})
		return !!classInst
	}
}