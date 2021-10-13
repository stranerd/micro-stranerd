import { ChangeStreamCallbacks } from '@utils/commons'
import { CourseEntity, CourseFromModel } from '@modules/resources'

export const CourseChangeStreamCallbacks: ChangeStreamCallbacks<CourseFromModel, CourseEntity> = {}