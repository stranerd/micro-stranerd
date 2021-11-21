import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase } from '@utils/commons'
import { CourseEntity } from '../../entities/courses'

export class FindCourseUseCase extends BaseUseCase<string, CourseEntity | null> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.find(id)
	}
}
