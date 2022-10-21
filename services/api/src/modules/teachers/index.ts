import { CourseRepository } from './data/repositories/courses'
import { FileRepository } from './data/repositories/files'
import { AttendanceRepository } from './data/repositories/attendances'
import { AssignmentRepository } from './data/repositories/assignments'
import { AssignmentSubmissionRepository } from './data/repositories/assignmentSubmissions'
import { CoursesUseCase } from './domain/useCases/courses'
import { FilesUseCase } from './domain/useCases/files'
import { AttendancesUseCase } from './domain/useCases/attendances'
import { AssignmentsUseCase } from './domain/useCases/assignments'
import { AssignmentSubmissionsUseCase } from './domain/useCases/assignmentSubmissions'

const courseRepository = CourseRepository.getInstance()
const fileRepository = FileRepository.getInstance()
const attendanceRepository = AttendanceRepository.getInstance()
const assignmentRepository = AssignmentRepository.getInstance()
const assignmentSubmissionRepository = AssignmentSubmissionRepository.getInstance()

export const CoursesUseCases = new CoursesUseCase(courseRepository)
export const FilesUseCases = new FilesUseCase(fileRepository)
export const AttendancesUseCases = new AttendancesUseCase(attendanceRepository)
export const AssignmentsUseCases = new AssignmentsUseCase(assignmentRepository)
export const AssignmentSubmissionsUseCases = new AssignmentSubmissionsUseCase(assignmentSubmissionRepository)

export { CourseFromModel } from './data/models/courses'
export { FileFromModel } from './data/models/files'
export { AttendanceFromModel } from './data/models/attendances'
export { AssignmentFromModel } from './data/models/assignments'
export { AssignmentSubmissionFromModel } from './data/models/assignmentSubmissions'

export { CourseEntity } from './domain/entities/courses'
export { FileEntity } from './domain/entities/files'
export { AttendanceEntity } from './domain/entities/attendances'
export { AssignmentEntity } from './domain/entities/assignments'
export { AssignmentSubmissionEntity } from './domain/entities/assignmentSubmissions'
