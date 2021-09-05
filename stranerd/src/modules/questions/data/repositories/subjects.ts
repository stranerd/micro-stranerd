import { SubjectEntity } from '../../domain/entities'
import { ISubjectRepository } from '../../domain/irepositories/subjects'
import { SubjectMapper } from '../mappers'
import { SubjectFromModel, SubjectToModel } from '../models/subjects'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { Subject } from '../mongooseModels'

export class SubjectRepository implements ISubjectRepository {
	private static instance: SubjectRepository
	private mapper: SubjectMapper

	private constructor () {
		this.mapper = new SubjectMapper()
	}

	static getInstance () {
		if (!SubjectRepository.instance) SubjectRepository.instance = new SubjectRepository()
		return SubjectRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<SubjectFromModel>(Subject, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await Subject.findByIdAndDelete(id)
		return !!deleteData
	}

	async add (data: SubjectToModel) {
		const subject = await new Subject(data).save()
		return this.mapper.mapFrom(subject)!
	}

	async update (id: string, data: SubjectToModel) {
		const subject = await Subject.findByIdAndUpdate(id, { $set: data }, { new: true })
		return this.mapper.mapFrom(subject)!
	}

	async find (id: string): Promise<SubjectEntity | null> {
		const subject = await Subject.findById(id)
		return this.mapper.mapFrom(subject)
	}
}
