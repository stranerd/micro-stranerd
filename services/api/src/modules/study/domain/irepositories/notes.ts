import { NoteEntity } from '../entities/notes'
import { NoteToModel } from '../../data/models/notes'
import { QueryParams, QueryResults } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export interface INoteRepository {
	add: (data: NoteToModel) => Promise<NoteEntity>
	get: (condition: QueryParams) => Promise<QueryResults<NoteEntity>>
	find: (id: string) => Promise<NoteEntity | null>
	update: (id: string, userId: string, data: Partial<NoteToModel>) => Promise<NoteEntity | null>
	delete: (id: string, userId: string) => Promise<boolean>
	updateUserBio: (user: EmbeddedUser) => Promise<boolean>
}