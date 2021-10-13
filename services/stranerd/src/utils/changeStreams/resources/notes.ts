import { ChangeStreamCallbacks } from '@utils/commons'
import { NoteEntity, NoteFromModel } from '@modules/resources'

export const NoteChangeStreamCallbacks: ChangeStreamCallbacks<NoteFromModel, NoteEntity> = {}