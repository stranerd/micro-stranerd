import { SchoolEntity } from '../../domain/entities/schools'
import { ISchoolRepository } from '../../domain/irepositories/schools'
import { SchoolMapper } from '../mappers/schools'
import { SchoolFromModel, SchoolToModel } from '../models/schools'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { School } from '../mongooseModels/schools'

export class SchoolRepository implements ISchoolRepository {
	private static instance: SchoolRepository
	private mapper: SchoolMapper

	private constructor () {
		this.mapper = new SchoolMapper()
	}

	static getInstance () {
		if (!SchoolRepository.instance) SchoolRepository.instance = new SchoolRepository()
		return SchoolRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<SchoolFromModel>(School, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await School.findByIdAndDelete(id)
		return !!deleteData
	}

	async add (data: SchoolToModel) {
		const school = await new School(data).save()
		return this.mapper.mapFrom(school)!
	}

	async update (id: string, data: SchoolToModel) {
		const school = await School.findByIdAndUpdate(id, { $set: data }, { new: true })
		return this.mapper.mapFrom(school)!
	}

	async find (id: string): Promise<SchoolEntity | null> {
		const school = await School.findById(id)
		return this.mapper.mapFrom(school)
	}
}
