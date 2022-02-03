import { ISetRepository } from '../../domain/irepositories/sets'
import { SetMapper } from '../mappers/sets'
import { SetFromModel, SetToModel } from '../models/sets'
import { Set } from '../mongooseModels/sets'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { UserBio } from '../../domain/types'

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
		const set = await Set.findOneAndUpdate({ _id: id, userId }, { $set: data })
		return this.mapper.mapFrom(set)
	}

	async updateSetsUserBio (userId: string, userBio: UserBio) {
		const sets = await Set.updateMany({ userId }, { $set: { userBio } })
		return sets.acknowledged
	}

	async delete (id: string, userId: string) {
		const set = await Set.findOneAndDelete({ _id: id, userId })
		return !!set
	}

	async updateSetProp (id: string, userId: string, prop: keyof SetFromModel['saved'], add: boolean, values: string[]) {
		const set = await Set.findOneAndUpdate({ _id: id, userId }, {
			[add ? '$addToSet' : '$pull']: {
				[`saved.${prop}`]: {
					[add ? '$each' : '$in']: values
				}
			}
		})
		return !!set
	}

	async updateSetChildren (id: string, add: boolean, values: string[]) {
		const set = await Set.findOneAndUpdate({ _id: id }, {
			[add ? '$addToSet' : '$pull']: {
				children: { [add ? '$each' : '$in']: values }
			}
		})
		return !!set
	}

	async removeSetProp (prop: keyof SetFromModel['saved'], value: string) {
		const sets = await Set.updateMany({ [`saved.${prop}`]: value }, {
			$pull: { [`saved.${prop}`]: value }
		})
		return sets.acknowledged
	}

	async deleteSetChildren (id: string) {
		const sets = await Set.deleteMany({ parent: id })
		return sets.acknowledged
	}
}
