import { ISetRepository } from '../../domain/irepositories/sets'
import { SetMapper } from '../mappers/sets'
import { SetFromModel, SetToModel } from '../models/sets'
import { Set } from '../mongooseModels/sets'
import { parseQueryParams, QueryParams } from '@utils/app/package'
import { EmbeddedUser, SetSaved } from '../../domain/types'

export class SetRepository implements ISetRepository {
	private static instance: SetRepository
	private mapper: SetMapper

	private constructor () {
		this.mapper = new SetMapper()
	}

	static getInstance () {
		if (!SetRepository.instance) SetRepository.instance = new SetRepository()
		return SetRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<SetFromModel>(Set, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: SetToModel) {
		const set = await new Set(data).save()
		return this.mapper.mapFrom(set)!
	}

	async find (id: string) {
		const set = await Set.findById(id)
		return this.mapper.mapFrom(set)
	}

	async update (id: string, userId: string, data: Partial<SetToModel>) {
		const set = await Set.findOneAndUpdate({ _id: id, 'user.id': userId }, { $set: data }, { new: true })
		return this.mapper.mapFrom(set)
	}

	async updateUserBio (user: EmbeddedUser) {
		const sets = await Set.updateMany({ 'user.id': user.id }, { $set: { user } })
		return sets.acknowledged
	}

	async delete (id: string, userId: string) {
		const set = await Set.findOneAndDelete({ _id: id, 'user.id': userId })
		return !!set
	}

	async updateProp (id: string, userId: string, prop: SetSaved, add: boolean, values: string[]) {
		const set = await Set.findOneAndUpdate({ _id: id, 'user.id': userId }, {
			[add ? '$addToSet' : '$pull']: {
				[`saved.${prop}`]: {
					[add ? '$each' : '$in']: values
				}
			}
		})
		return !!set
	}

	async removeProp (prop: SetSaved, value: string) {
		const sets = await Set.updateMany({ [`saved.${prop}`]: value }, {
			$pull: { [`saved.${prop}`]: value }
		})
		return sets.acknowledged
	}
}
