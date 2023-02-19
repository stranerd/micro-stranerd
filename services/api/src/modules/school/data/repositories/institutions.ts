import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { InstitutionEntity } from '../../domain/entities/institutions'
import { IInstitutionRepository } from '../../domain/irepositories/institutions'
import { InstitutionMapper } from '../mappers/institutions'
import { InstitutionFromModel, InstitutionToModel } from '../models/institutions'
import { Institution } from '../mongooseModels/institutions'

export class InstitutionRepository implements IInstitutionRepository {
	private static instance: InstitutionRepository
	private mapper: InstitutionMapper

	private constructor () {
		this.mapper = new InstitutionMapper()
	}

	static getInstance () {
		if (!InstitutionRepository.instance) InstitutionRepository.instance = new InstitutionRepository()
		return InstitutionRepository.instance
	}

	async get (query: QueryParams) {
		const data = await appInstance.db.parseQueryParams<InstitutionFromModel>(Institution, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await Institution.findByIdAndDelete(id)
		return !!deleteData
	}

	async add (data: InstitutionToModel) {
		const institution = await new Institution(data).save()
		return this.mapper.mapFrom(institution)!
	}

	async update (id: string, data: Partial<InstitutionToModel>) {
		const institution = await Institution.findByIdAndUpdate(id, { $set: data }, { new: true })
		return this.mapper.mapFrom(institution)
	}

	async find (id: string): Promise<InstitutionEntity | null> {
		const institution = await Institution.findById(id)
		return this.mapper.mapFrom(institution)
	}
}
