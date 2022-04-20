import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase } from '@utils/commons'

export class DeleteDepartmentCoursesUseCase extends BaseUseCase<string, boolean> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (departmentId: string) {
		return await this.repository.deleteDepartmentCourses(departmentId)
	}
}
