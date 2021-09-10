import { ChangeStreamCallbacks } from '@utils/commons'
import { SubjectEntity, SubjectFromModel } from '@modules/questions'

export const SubjectChangeStreamCallbacks: ChangeStreamCallbacks<SubjectFromModel, SubjectEntity> = {}