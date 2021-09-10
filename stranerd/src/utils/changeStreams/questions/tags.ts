import { ChangeStreamCallbacks } from '@utils/commons'
import { TagEntity, TagFromModel } from '@modules/questions'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {}