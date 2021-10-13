import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { CourseEntity } from '../../entities/courses'

export class GetCoursesUseCase extends BaseUseCase<QueryParams, QueryResults<CourseEntity>> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
