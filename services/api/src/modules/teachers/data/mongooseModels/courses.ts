import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { CourseDbChangeCallbacks } from '@utils/changeStreams/teachers/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { CourseMapper } from '../mappers/courses'
import { CourseFromModel } from '../models/courses'

const Schema = new mongoose.Schema<CourseFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	level: {
		type: String,
		required: false,
		default: ''
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as CourseFromModel['user'],
		required: true
	},
	members: {
		type: [String],
		required: false,
		default: []
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

export const Course = mongoose.model<CourseFromModel>('StranerdTeachersCourse', Schema)

export const CourseChange = appInstance.db
	.generateDbChange<CourseFromModel, CourseEntity>(Course, CourseDbChangeCallbacks, new CourseMapper().mapFrom)