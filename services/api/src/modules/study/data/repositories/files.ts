import { QueryParams } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { IFileRepository } from '../../domain/irepositories/files'
import { EmbeddedUser } from '../../domain/types'
import { FileMapper } from '../mappers/files'
import { FileFromModel, FileToModel } from '../models/files'
import { File } from '../mongooseModels/files'

export class FileRepository implements IFileRepository {
	private static instance: FileRepository
	private mapper: FileMapper

	private constructor () {
		this.mapper = new FileMapper()
	}

	static getInstance () {
		if (!FileRepository.instance) FileRepository.instance = new FileRepository()
		return FileRepository.instance
	}

	async get (query: QueryParams) {
		const data = await appInstance.db.parseQueryParams<FileFromModel>(File, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: FileToModel) {
		const file = await new File(data).save()
		return this.mapper.mapFrom(file)!
	}

	async find (id: string) {
		const file = await File.findById(id)
		return this.mapper.mapFrom(file)
	}

	async update (id: string, userId: string, data: Partial<FileToModel>) {
		const file = await File.findOneAndUpdate({ _id: id, 'user.id': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(file)
	}

	async updateUserBio (user: EmbeddedUser) {
		const files = await File.updateMany({ 'user.id': user.id }, { $set: { user } })
		return files.acknowledged
	}

	async delete (id: string, userId: string) {
		const file = await File.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!file
	}
}
