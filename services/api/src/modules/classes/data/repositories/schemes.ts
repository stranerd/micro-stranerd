import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ISchemeRepository } from '../../domain/irepositories/schemes'
import { ClassUsers, EmbeddedUser } from '../../domain/types'
import { SchemeMapper } from '../mappers/schemes'
import { SchemeFromModel, SchemeToModel } from '../models/schemes'
import { Scheme } from '../mongooseModels/schemes'

export class SchemeRepository implements ISchemeRepository {
	private static instance: SchemeRepository
	private mapper: SchemeMapper

	private constructor () {
		this.mapper = new SchemeMapper()
	}

	static getInstance () {
		if (!SchemeRepository.instance) SchemeRepository.instance = new SchemeRepository()
		return SchemeRepository.instance
	}

	async get (query: QueryParams) {
		const data = await appInstance.db.parseQueryParams<SchemeFromModel>(Scheme, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: SchemeToModel) {
		const createdAt = Date.now()
		const scheme = await new Scheme({
			...data, createdAt, updatedAt: createdAt,
			readAt: { [data.user.id]: createdAt }
		}).save()
		return this.mapper.mapFrom(scheme)!
	}

	async find (id: string) {
		const scheme = await Scheme.findById(id)
		return this.mapper.mapFrom(scheme)
	}

	async update (classId: string, id: string, userId: string, data: Partial<SchemeToModel>) {
		const scheme = await Scheme.findOneAndUpdate({
			_id: id,
			'users.admins': userId,
			classId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(scheme)
	}

	async delete (classId: string, id: string, userId: string) {
		const scheme = await Scheme.findOneAndDelete({ _id: id, 'users.admins': userId, classId })
		return !!scheme
	}

	async updateUserBio (user: EmbeddedUser) {
		const schemes = await Scheme.updateMany({ 'user.id': user.id }, { $set: { user } })
		return schemes.acknowledged
	}

	async updateUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const schemes = await Scheme.updateMany({ classId }, { $set: { users } })
		return schemes.acknowledged
	}

	async deleteClassSchemes (classId: string) {
		const schemes = await Scheme.deleteMany({ classId })
		return schemes.acknowledged
	}

	async markRead (classId: string, userId: string) {
		const readAt = Date.now()
		const schemes = await Scheme.updateMany(
			{ classId, [`readAt.${userId}`]: null },
			{ $set: { [`readAt.${userId}`]: readAt } }
		)
		return schemes.acknowledged
	}
}
