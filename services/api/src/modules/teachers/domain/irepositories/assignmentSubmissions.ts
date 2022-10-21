import { AssignmentSubmissionEntity } from '../entities/assignmentSubmissions'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export interface IAssignmentSubmissionRepository {
	get: (condition: QueryParams) => Promise<QueryResults<AssignmentSubmissionEntity>>
	find: (id: string) => Promise<AssignmentSubmissionEntity | null>
	delete: (courseId: string, id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateMembers: (courseId: string, members: string[]) => Promise<boolean>
	deleteAssignmentSubmissions: (assignmentId: string) => Promise<boolean>
}