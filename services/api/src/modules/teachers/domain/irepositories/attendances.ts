import { AttendanceEntity } from '../entities/attendances'
import { AttendanceToModel } from '../../data/models/attendances'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export interface IAttendanceRepository {
	add: (data: AttendanceToModel) => Promise<AttendanceEntity>
	get: (condition: QueryParams) => Promise<QueryResults<AttendanceEntity>>
	find: (id: string) => Promise<AttendanceEntity | null>
	update: (id: string, userId: string, data: Partial<AttendanceToModel>) => Promise<AttendanceEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
	updateMembers: (courseId: string, members: string[]) => Promise<boolean>
	deleteCourseAttendances: (courseId: string) => Promise<boolean>
}