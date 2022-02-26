import { IClassRepository } from '../../domain/irepositories/classes'
import { ClassMapper } from '../mappers/classes'
import { ClassFromModel, ClassToModel } from '../models/classes'
import { Class } from '../mongooseModels/classes'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '../../domain/types'

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
		const classInstance = await new Class(data).save()
		return this.mapper.mapFrom(classInstance)!
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
}
