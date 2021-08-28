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

export const generatePaginateResult = (dataArray,dataRaw) => {

	return {
		docs: dataArray,
		hasNextPage: dataRaw.hasNextPage,
		hasPrevPage: dataRaw.hasNextPage,
		totalDocs: dataRaw.totalDocs,
		limit: dataRaw.limit,
		page: dataRaw.page,
		totalPages: dataRaw.totalPages,
		nextPage: dataRaw.nextPage,
		prevPage: dataRaw.prevPage,
		pagingCounter: dataRaw.pagingCounter,
		meta: dataRaw.meta
	}
		
}


