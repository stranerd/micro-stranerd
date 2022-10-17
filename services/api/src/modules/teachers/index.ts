import { CourseRepository } from './data/repositories/courses'
import { FileRepository } from './data/repositories/files'
import { AttendanceRepository } from './data/repositories/attendances'
import { CoursesUseCase } from './domain/useCases/courses'
import { FilesUseCase } from './domain/useCases/files'
import { AttendancesUseCase } from './domain/useCases/attendances'

const courseRepository = CourseRepository.getInstance()
const fileRepository = FileRepository.getInstance()
const attendanceRepository = AttendanceRepository.getInstance()

export const CoursesUseCases = new CoursesUseCase(courseRepository)
export const FilesUseCases = new FilesUseCase(fileRepository)
export const AttendancesUseCases = new AttendancesUseCase(attendanceRepository)

export { CourseFromModel } from './data/models/courses'
export { FileFromModel } from './data/models/files'
export { AttendanceFromModel } from './data/models/attendances'

export { CourseEntity } from './domain/entities/courses'
export { FileEntity } from './domain/entities/files'
export { AttendanceEntity } from './domain/entities/attendances'
