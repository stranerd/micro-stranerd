import { PastQuestionEntity } from '../entities/pastQuestions'
import { PastQuestionToModel } from '../../data/models/pastQuestions'
import { QueryParams, QueryResults } from '@utils/app/package'

export interface IPastQuestionRepository {
	add: (data: PastQuestionToModel) => Promise<PastQuestionEntity>
	get: (condition: QueryParams) => Promise<QueryResults<PastQuestionEntity>>
	find: (id: string) => Promise<PastQuestionEntity | null>
	update: (id: string, data: Partial<PastQuestionToModel>) => Promise<PastQuestionEntity | null>
	delete: (id: string) => Promise<boolean>
	deleteCourseQuestions: (courseId: string) => Promise<boolean>
}