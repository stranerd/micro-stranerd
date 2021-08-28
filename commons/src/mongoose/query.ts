import { mongoose } from './index'

export enum Conditions {
	'lt', 'lte', 'gt', 'gte', 'eq', 'ne', 'in', 'nin'
}

export async function parseQueryParams<Model> (collection: mongoose.Model<Model | {}>, params: Record<string, any>): Promise<QueryResults<Model>> {
	// Handle where clauses
	const whereType = ['and', 'or'].indexOf(params.whereType) !== -1 ? params.whereType : 'and'
	const where = ((params.where ?? []) as { condition: string, value: any, field: string }[])
		.filter(({ field, condition, value }) => !!field && !!condition && !!value)
		.map(({ field, value, condition }) => {
			const checkedField = field === 'id' ? '_id' : (field ?? '')
			const parsedValue = value ?? ''
			const checkedValue = field === 'id'
				? mongoose.Types.ObjectId.isValid(parsedValue) ? parsedValue : new mongoose.Types.ObjectId()
				: parsedValue
			const checkedCondition = Object.keys(Conditions).indexOf(condition) > -1 ? condition : Conditions.eq
			return ({
				field: checkedField,
				value: checkedValue,
				condition: checkedCondition
			})
		})
	const whereClause = {}
	if (where.length > 0) {
		whereClause[`$${ whereType }`] = where.map((c) => ({
			[`${ c.field }`]: { [`$${ c.condition }`]: c.value }
		}))
	}

	// Handle sort clauses
	const sortField = params.sort?.field ?? null
	const sortOrder = [-1, 1].indexOf(Number(params.sort?.order)) !== -1 ? Number(params.sort?.order) : 1

	// Handle limit clause
	const limit = Number(params.limit) <= 100 ? Number(params.limit) : 100

	// Handle offset clause
	let page = Number.isNaN(Number(params.page)) ? 0 : Number(params.page)
	page = page < 1 ? 1 : page

	const total = await collection.find(whereClause).countDocuments().exec()

	let builtQuery = collection.find(whereClause)
	if (sortField) builtQuery = builtQuery.sort([[sortField, sortOrder]])
	if (limit) builtQuery = builtQuery.limit(limit)
	if (page && limit) builtQuery = builtQuery.skip((page - 1) * limit)

	const results = await builtQuery.exec()

	const start = 1
	const last = Math.ceil(total / limit)
	const next = page >= last ? null : page + 1
	const previous = page <= start ? null : page - 1

	return {
		pages: {
			start, last, next, previous, current: page
		},
		docs: {
			limit, total, count: results.length
		},
		results: results.map((r) => r.toJSON()) as Model[]
	}
}

export type QueryResults<Model> = {
	pages: {
		start: number,
		last: number,
		previous: number | null,
		next: number | null,
		current: number,
	},
	docs: {
		limit: number,
		total: number,
		count: number
	},
	results: Model[]
}
