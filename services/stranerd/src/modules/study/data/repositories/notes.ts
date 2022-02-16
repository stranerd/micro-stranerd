import { INoteRepository } from '../../domain/irepositories/notes'
import { NoteMapper } from '../mappers/notes'
import { NoteFromModel, NoteToModel } from '../models/notes'
import { Note } from '../mongooseModels/notes'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '../../domain/types'

export class NoteRepository implements INoteRepository {
	private static instance: NoteRepository
	private mapper: NoteMapper

	private constructor () {
		this.mapper = new NoteMapper()
	}

	static getInstance () {
		if (!NoteRepository.instance) NoteRepository.instance = new NoteRepository()
		return NoteRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<NoteFromModel>(Note, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: NoteToModel) {
		const note = await new Note(data).save()
		return this.mapper.mapFrom(note)!
	}

	async find (id: string) {
		const note = await Note.findById(id)
		return this.mapper.mapFrom(note)
	}

	async update (id: string, userId: string, data: Partial<NoteToModel>) {
		const note = await Note.findOneAndUpdate({ _id: id, userId }, { $set: data })
		return this.mapper.mapFrom(note)
	}

	async updateNotesUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const notes = await Note.updateMany({ userId }, { $set: { userBio, userRoles } })
		return notes.acknowledged
	}

	async delete (id: string, userId: string) {
		const note = await Note.findOneAndDelete({ _id: id, userId })
		return !!note
	}
}
