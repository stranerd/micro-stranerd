import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { CourseDbChangeCallbacks } from '@utils/changeStreams/school/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { CourseMapper } from '../mappers/courses'
import { CourseFromModel } from '../models/courses'

const Schema = new mongoose.Schema<CourseFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
	},
	institutionId: {
		type: String,
		required: true
	},
	facultyId: {
		type: String,
		required: false,
		default: null
	},
	departmentId: {
		type: String,
		required: false,
		default: null
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Course = mongoose.model<CourseFromModel>('StranerdSchoolCourse', Schema)

export const CourseChange = appInstance.db
	.generateDbChange<CourseFromModel, CourseEntity>(Course, CourseDbChangeCallbacks, new CourseMapper().mapFrom)