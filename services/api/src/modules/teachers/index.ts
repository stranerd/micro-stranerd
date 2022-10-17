import { CourseRepository } from './data/repositories/courses'
import { FileRepository } from './data/repositories/files'
import { CoursesUseCase } from './domain/useCases/courses'
import { FilesUseCase } from './domain/useCases/files'

const courseRepository = CourseRepository.getInstance()
const fileRepository = FileRepository.getInstance()

export const CoursesUseCases = new CoursesUseCase(courseRepository)
export const FilesUseCases = new FilesUseCase(fileRepository)

export { CourseFromModel } from './data/models/courses'
export { FileFromModel } from './data/models/files'

export { CourseEntity } from './domain/entities/courses'
export { FileEntity } from './domain/entities/files'
