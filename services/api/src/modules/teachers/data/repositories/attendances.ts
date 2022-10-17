import { IAttendanceRepository } from '../../domain/irepositories/attendances'
import { AttendanceMapper } from '../mappers/attendances'
import { AttendanceFromModel, AttendanceToModel } from '../models/attendances'
import { Attendance } from '../mongooseModels/attendances'
import { parseQueryParams, QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../../domain/types'

export class AttendanceRepository implements IAttendanceRepository {
	private static instance: AttendanceRepository
	private mapper: AttendanceMapper

	private constructor () {
		this.mapper = new AttendanceMapper()
	}

	static getInstance () {
		if (!AttendanceRepository.instance) AttendanceRepository.instance = new AttendanceRepository()
		return AttendanceRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<AttendanceFromModel>(Attendance, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: AttendanceToModel) {
		const attendance = await new Attendance(data).save()
		return this.mapper.mapFrom(attendance)!
	}

	async find (id: string) {
		const attendance = await Attendance.findById(id)
		return this.mapper.mapFrom(attendance)
	}

	async update (id: string, userId: string, data: Partial<AttendanceToModel>) {
		const attendance = await Attendance.findOneAndUpdate({
			_id: id,
			'user.id': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(attendance)
	}

	async updateUserBio (user: EmbeddedUser) {
		const attendances = await Attendance.updateMany({ 'user.id': user.id }, { $set: { user } })
		return attendances.acknowledged
	}

	async delete (id: string, userId: string) {
		const attendance = await Attendance.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!attendance
	}

	async updateMembers (courseId: string, members: string[]) {
		const res = await Attendance.updateMany({ courseId }, { $set: { members } }, { new: true })
		return res.acknowledged
	}

	async deleteCourseAttendances (courseId: string) {
		const res = await Attendance.deleteMany({ courseId })
		return res.acknowledged
	}
}
