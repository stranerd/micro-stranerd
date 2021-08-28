import { SubjectEntity } from '../../domain/entities'
import { ISubjectRepository } from '../../domain/i-repositories/subject'
import { SubjectMapper } from '../mappers'
import { SubjectToModel, SubjectFromModel } from '../models/subject'
import { Subjects } from '../mongooseModels'

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

	async get (subjectIds?: string[]): Promise<SubjectEntity[]> {
		const subjects: SubjectEntity[] = []

		if(subjectIds == undefined) {

		 const subjectsRaw: SubjectFromModel[] | null = await Subjects.find({})
		 if(subjectsRaw) {

			 for (let index = 0; index < subjectsRaw.length; index++) {
				 const subjectData = subjectsRaw[index]
				 const subject: SubjectEntity = this.mapper.mapFrom(subjectData)
				 subjects.push(subject)
			 }

		   } 

		} else { 
		
		 for (let index = 0; index < subjectIds.length; index++) {
			 const subjectId = subjectIds[index]
			 const subjectRaw: SubjectFromModel | null = await Subjects.findById(subjectId)
			
			 if(subjectRaw) {
				 const subject: SubjectEntity = this.mapper.mapFrom(subjectRaw)
				 subjects.push(subject)
			 }
		 }
	 }
         
		 return subjects
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
