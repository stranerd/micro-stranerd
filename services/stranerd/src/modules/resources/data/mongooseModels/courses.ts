import { generateChangeStreams, mongoose } from '@utils/commons'
import { CourseFromModel } from '../models/courses'
import { CourseChangeStreamCallbacks } from '@utils/changeStreams/resources/courses'
import { CourseEntity } from '../../domain/entities/courses'
import { CourseMapper } from '../mappers/courses'

const Schema = new mongoose.Schema<CourseFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	name: {
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
}, { timestamps: { currentTime: Date.now } })

export const Course = mongoose.model<CourseFromModel>('StranerdCourse', Schema)

generateChangeStreams<CourseFromModel, CourseEntity>(Course, CourseChangeStreamCallbacks, new CourseMapper().mapFrom).then()