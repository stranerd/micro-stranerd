import { CourseToModel } from '../../../data/models/courses'
import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase } from '@utils/commons'
import { CourseEntity } from '../../entities/courses'

type Input = { id: string, data: Partial<CourseToModel> }

export class UpdateCourseUseCase extends BaseUseCase<Input, CourseEntity | null> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.update(input.id, input.data)
	}
}
