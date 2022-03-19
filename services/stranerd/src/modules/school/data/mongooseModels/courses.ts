import { generateChangeStreams, mongoose } from '@utils/commons'
import { CourseFromModel } from '../models/courses'
import { CourseChangeStreamCallbacks } from '@utils/changeStreams/school/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { CourseMapper } from '../mappers/courses'

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

export const Course = mongoose.model<CourseFromModel>('StranerdStudyCourse', Schema)

generateChangeStreams<CourseFromModel, CourseEntity>(Course, CourseChangeStreamCallbacks, new CourseMapper().mapFrom).then()