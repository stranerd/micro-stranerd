import { ChangeStreamCallbacks } from '@utils/commons'
import { TagFromModel } from '@modules/questions/data/models/tags'
import { TagEntity } from '@modules/questions/domain/entities'

export const TagChangeStreamCallbacks: ChangeStreamCallbacks<TagFromModel, TagEntity> = {}