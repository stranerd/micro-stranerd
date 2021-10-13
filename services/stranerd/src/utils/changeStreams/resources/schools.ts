import { ChangeStreamCallbacks } from '@utils/commons'
import { SchoolEntity, SchoolFromModel } from '@modules/resources'

export const SchoolChangeStreamCallbacks: ChangeStreamCallbacks<SchoolFromModel, SchoolEntity> = {}