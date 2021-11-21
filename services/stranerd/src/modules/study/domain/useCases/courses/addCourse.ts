import { CourseToModel } from '../../../data/models/courses'
import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase } from '@utils/commons'
import { CourseEntity } from '../../entities/courses'

export class AddCourseUseCase extends BaseUseCase<CourseToModel, CourseEntity> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (data: CourseToModel) {
		return await this.repository.add(data)
	}
}
