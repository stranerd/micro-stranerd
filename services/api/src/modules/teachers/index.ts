import { CourseRepository } from './data/repositories/courses'
import { CoursesUseCase } from './domain/useCases/courses'

const courseRepository = CourseRepository.getInstance()

export const CoursesUseCases = new CoursesUseCase(courseRepository)

export { CourseFromModel } from './data/models/courses'

export { CourseEntity } from './domain/entities/courses'
