import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { INoteRepository } from '../../domain/irepositories/notes'
import { EmbeddedUser } from '../../domain/types'
import { NoteMapper } from '../mappers/notes'
import { NoteFromModel, NoteToModel } from '../models/notes'
import { Note } from '../mongooseModels/notes'

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
		const data = await appInstance.db.parseQueryParams<NoteFromModel>(Note, query)

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
		const note = await Note.findOneAndUpdate({ _id: id, 'user.id': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(note)
	}

	async updateUserBio (user: EmbeddedUser) {
		const notes = await Note.updateMany({ 'user.id': user.id }, { $set: { user } })
		return notes.acknowledged
	}

	async delete (id: string, userId: string) {
		const note = await Note.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!note
	}
}
