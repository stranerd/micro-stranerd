import { ChangeStreamCallbacks } from '@utils/commons'
import { SubjectFromModel } from '@modules/questions/data/models/subjects'
import { SubjectEntity } from '@modules/questions/domain/entities'

export const SubjectChangeStreamCallbacks: ChangeStreamCallbacks<SubjectFromModel, SubjectEntity> = {}