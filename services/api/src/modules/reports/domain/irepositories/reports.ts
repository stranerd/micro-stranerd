import { ReportEntity } from '../entities/reports'
import { ReportToModel } from '../../data/models/reports'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export interface IReportRepository {
	find (id: string): Promise<ReportEntity | null>

	create (data: ReportToModel): Promise<ReportEntity>

	get (query: QueryParams): Promise<QueryResults<ReportEntity>>

	delete (id: string): Promise<boolean>

	updateReportsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles): Promise<boolean>
}