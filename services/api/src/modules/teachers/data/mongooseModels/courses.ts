import { generateChangeStreams, mongoose } from '@utils/app/package'
import { CourseFromModel } from '../models/courses'
import { CourseChangeStreamCallbacks } from '@utils/changeStreams/teachers/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { CourseMapper } from '../mappers/courses'

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

generateChangeStreams<CourseFromModel, CourseEntity>(Course, CourseChangeStreamCallbacks, new CourseMapper().mapFrom).then()