import { PaginateOptions } from 'mongoose'

export type GetClause = {
	query: object
	options: PaginateOptions
}


export const CustomLabels = {
	totalDocs: 'itemCount',
	docs: 'itemsList',
	limit: 'perPage',
	hasPrevPage:'hasPrevPage',
	hasNextPage:'hasNextPage',
	offset:'offset',
	page: 'currentPage',
	nextPage: 'next',
	prevPage: 'prev',
	totalPages: 'pageCount',
	pagingCounter: 'slNo',
	meta: 'paginator'
}