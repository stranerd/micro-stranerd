import { ICourseRepository } from '../../domain/irepositories/courses'
import { CourseMapper } from '../mappers/courses'
import { CourseFromModel, CourseToModel } from '../models/courses'
import { Course } from '../mongooseModels/courses'
import { parseQueryParams, QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../../domain/types'

export class CourseRepository implements ICourseRepository {
	private static instance: CourseRepository
	private mapper: CourseMapper

	private constructor () {
		this.mapper = new CourseMapper()
	}

	static getInstance () {
		if (!CourseRepository.instance) CourseRepository.instance = new CourseRepository()
		return CourseRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<CourseFromModel>(Course, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: CourseToModel) {
		const course = await new Course({ ...data, members: [data.user.id] }).save()
		return this.mapper.mapFrom(course)!
	}

	async find (id: string) {
		const course = await Course.findById(id)
		return this.mapper.mapFrom(course)
	}

	async update (id: string, userId: string, data: Partial<CourseToModel>) {
		const course = await Course.findOneAndUpdate({ _id: id, 'user.id': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(course)
	}

	async updateUserBio (user: EmbeddedUser) {
		const courses = await Course.updateMany({ 'user.id': user.id }, { $set: { user } })
		return courses.acknowledged
	}

	async delete (id: string, userId: string) {
		const course = await Course.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!course
	}

	async join (courseId: string, userId: string, join: boolean) {
		const course = await Course.findOneAndUpdate({ _id: courseId, 'user.id': { $ne: userId } }, {
			[join ? '$addToSet' : '$pull']: { userId }
		}, { new: true })
		return !!course
	}
}
