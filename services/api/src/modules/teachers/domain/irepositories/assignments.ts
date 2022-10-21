import { AssignmentEntity } from '../entities/assignments'
import { AssignmentToModel } from '../../data/models/assignments'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export interface IAssignmentRepository {
	add: (data: AssignmentToModel) => Promise<AssignmentEntity>
	get: (condition: QueryParams) => Promise<QueryResults<AssignmentEntity>>
	find: (id: string) => Promise<AssignmentEntity | null>
	update: (courseId: string, id: string, userId: string, data: Partial<AssignmentToModel>) => Promise<AssignmentEntity | null>
	delete: (courseId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateMembers: (courseId: string, members: string[]) => Promise<boolean>
	deleteCourseAssignments: (courseId: string) => Promise<boolean>
}