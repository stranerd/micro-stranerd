import { QuestionEntity } from '../entities/question'
import { QuestionToModel } from '../../data/models/question'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<boolean>
	get: (baseId: string,filterType: string, questionIds?: string[]) => Promise<QuestionEntity[]>
	find: (id: string) => Promise<QuestionEntity | null>
	update: (id: string, data: Partial<QuestionToModel>) => Promise<boolean>
	delete: (id: string) => Promise<boolean>
}
