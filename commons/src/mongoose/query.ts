import { mongoose } from './index'

export enum Conditions {
	lt = 'lt', lte = 'lte', gt = 'gt', gte = 'gte',
	eq = 'eq', ne = 'ne', in = 'in', nin = 'nin'
}

type Where = { field: string, value: any, condition?: Conditions }

export type QueryParams = {
	where?: Where[]
	auth?: Where[]
	whereType?: 'and' | 'or'
	sort?: { field: string, order?: 1 | -1 }
	limit?: number
	page?: number
	search?: string
}

export async function parseQueryParams<Model> (collection: mongoose.Model<Model | any>, params: QueryParams): Promise<QueryResults<Model>> {
	// Handle where clauses
	const totalClause = { $and: [] as any }
	const whereType = ['and', 'or'].indexOf(params.whereType as string) !== -1 ? params.whereType! : 'and'
	const where = buildWhereQuery(params.where ?? [], whereType)
	if (where) totalClause.$and.push(where)
	if (params.auth) {
		const authType = params.auth.length > 1 ? 'or' : 'and'
		const auth =  buildWhereQuery(params.auth ?? [], authType)
		if (auth) totalClause.$and.push(auth)
	}
	if (params.search) totalClause['$text'] = { $search: params.search }

	// Handle sort clauses
	const sortField = params.sort?.field ?? null
	const sortOrder = [-1, 1].indexOf(Number(params.sort?.order)) !== -1 ? Number(params.sort?.order) : 1

	// Handle limit clause
	const limit = Number(params.limit) <= 100 ? Number(params.limit) : 100

	// Handle offset clause
	let page = Number.isNaN(Number(params.page)) ? 0 : Number(params.page)
	page = page < 1 ? 1 : page

	const total = await collection.countDocuments(totalClause).exec()

	let builtQuery = collection.find(totalClause)
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

const buildWhereQuery = (params: Where[], type: 'and' | 'or') => {
	const where = params.map(({ field, value, condition }) => {
		const checkedField = field === 'id' ? '_id' : (field ?? '')
		const parsedValue = value ?? ''
		const checkedValue = field === 'id'
			? mongoose.Types.ObjectId.isValid(parsedValue) ? parsedValue : new mongoose.Types.ObjectId()
			: (parsedValue ?? '')
		const checkedCondition = Object.keys(Conditions).indexOf(condition as unknown as string) > -1 ? condition : Conditions.eq
		return ({
			field: checkedField,
			value: checkedValue,
			condition: checkedCondition
		})
	}).map((c) => ({
		[`${ c.field }`]: {
			[`$${ c.condition }`]: c.value
		}
	}))

	return where.length > 0 ? {
		[`$${type}`]: where
	} : null
}