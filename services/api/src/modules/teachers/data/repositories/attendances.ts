import { QueryParams, Random } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { IAttendanceRepository } from '../../domain/irepositories/attendances'
import { EmbeddedUser } from '../../domain/types'
import { AttendanceMapper } from '../mappers/attendances'
import { AttendanceFromModel, AttendanceToModel } from '../models/attendances'
import { Attendance } from '../mongooseModels/attendances'

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
		const data = await appInstance.db.parseQueryParams<AttendanceFromModel>(Attendance, query)

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

	async update (courseId: string, id: string, userId: string, data: Partial<AttendanceToModel>) {
		const attendance = await Attendance.findOneAndUpdate({
			_id: id, courseId,
			'user.id': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(attendance)
	}

	async updateUserBio (user: EmbeddedUser) {
		const attendances = await Attendance.updateMany({ 'user.id': user.id }, { $set: { user } })
		return attendances.acknowledged
	}

	async delete (courseId: string, id: string, userId: string) {
		const attendance = await Attendance.findOneAndDelete({ _id: id, courseId, 'user.id': userId })
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

	async close (courseId: string, id: string, userId: string) {
		const attendance = await Attendance.findOneAndUpdate({
			_id: id,
			courseId,
			'user.id': userId,
			closedAt: null
		}, { $set: { closedAt: Date.now() } }, { new: true })
		return !!attendance
	}

	async generateToken (courseId: string, id: string, userId: string) {
		const attendance = this.mapper.mapFrom(await Attendance.findOneAndUpdate({
			_id: id,
			courseId,
			'user.id': userId,
			closedAt: null
		}))
		if (!attendance) return null
		const token = Random.string(24)
		const cacheKey = `teachers-attendances-tokens-${token}`
		await appInstance.cache.set(cacheKey, attendance.id, 30)
		return token
	}

	async tick (courseId: string, id: string, userId: string, token: string) {
		const cacheKey = `teachers-attendances-tokens-${token}`
		const attendanceId = await appInstance.cache.get(cacheKey)
		if (id !== attendanceId) return false
		const attendance = await Attendance.findOneAndUpdate(
			{ _id: attendanceId, courseId, 'user.id': { $ne: userId }, closedAt: null },
			{ $addToSet: { attended: userId } }, { new: true })
		await appInstance.cache.delete(cacheKey)
		return !!attendance
	}
}
