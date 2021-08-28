import { SubjectEntity } from '../../domain/entities'
import { ISubjectRepository } from '../../domain/i-repositories/subject'
import { SubjectMapper } from '../mappers'
import { SubjectToModel, SubjectFromModel } from '../models/subject'
import { Subjects } from '../mongooseModels'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'
import { generatePaginateResult } from '@utils/paginator'

export class SubjectRepository implements ISubjectRepository {
	private static instance: SubjectRepository
	private mapper: SubjectMapper

	private constructor () {
		this.mapper = new SubjectMapper()
	}

	static getInstance (): SubjectRepository {
		if (!SubjectRepository.instance) SubjectRepository.instance = new SubjectRepository()
		return SubjectRepository.instance
	}

	async get (condition: GetClause): Promise<PaginateResult<SubjectEntity> | null> {

		const subjects: SubjectEntity[] = []
		const subjectRaw: PaginateResult<SubjectFromModel> = await Subjects.paginate(condition.query,condition.options)

		if(subjectRaw) {

			 const returnData = subjectRaw.docs

			  returnData.forEach((data) => {
				const subject: SubjectEntity = this.mapper.mapFrom(data)
				subjects.push(subject)
			  })

			  const finalResult: PaginateResult<SubjectEntity> = generatePaginateResult(subjects,subjectRaw)

			 return finalResult
			 }
		 return null
	}

	async delete (id: string): Promise<boolean> {
		const deleteData = await Subjects.findOneAndDelete({_id:id})
		return deleteData ? true : false
	}

	async add (data: SubjectToModel): Promise<boolean> {
		const subjectData = await new Subjects(data).save()
		return subjectData ? true : false
	}

	async update (id: string, data: SubjectToModel): Promise<boolean> {

		const subjectData = await Subjects.findById(id)
		if(subjectData) {
			subjectData.name = data.name ? data.name : subjectData.name
		   return true
		} 
		return false
	}

	async find (id: string): Promise<SubjectEntity | null> {

		const subjectData = await Subjects.findById(id)
		if(subjectData) {
		  const subject: SubjectEntity = this.mapper.mapFrom(subjectData)
		  return subject
		} 
		
		return null
	}
}
