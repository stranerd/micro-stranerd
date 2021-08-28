import { SubjectEntity } from '../entities/subject'
import { SubjectToModel } from '../../data/models/subject'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<boolean>
	update: (id: string, data: SubjectToModel) => Promise<boolean>
	get: (subjectIds?: string[]) => Promise<SubjectEntity[]>
	find: (id: string) => Promise<SubjectEntity | null>
	delete: (id: string) => Promise<boolean>
}
