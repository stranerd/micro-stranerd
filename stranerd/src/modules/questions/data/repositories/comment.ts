import { ICommentRepository } from '../../domain/i-repositories/comment'
import { CommentEntity } from '../../domain/entities/comment'
import { CommentMapper } from '../mappers'
import { CommentFromModel, CommentToModel } from '../models'
import { Comments } from '../mongooseModels'
import { GetClause } from '@utils/paginator'
import { PaginateResult } from 'mongoose'
import { generatePaginateResult } from '@utils/paginator'

export class CommentRepository implements ICommentRepository {
	private static instance: CommentRepository
	private mapper: CommentMapper

	private constructor () {
		this.mapper = new CommentMapper()
	}

	static getInstance (): CommentRepository {
		if (!CommentRepository.instance) CommentRepository.instance = new CommentRepository()
		return CommentRepository.instance
	}

	async get (condition: GetClause): Promise<PaginateResult<CommentEntity> | null> {

		const comments: CommentEntity[] = []
		const commentRaw: PaginateResult<CommentFromModel> = await Comments.paginate(condition.query,condition.options)

		if(commentRaw) {

			 const returnData = commentRaw.docs

			  returnData.forEach((commentData) => {
				const comment: CommentEntity = this.mapper.mapFrom(commentData)
				comments.push(comment)
			  })

			  const finalResult: PaginateResult<CommentEntity> = generatePaginateResult(comments,commentRaw)

			 return finalResult
			 }
		 return null
	}

	async add (data: CommentToModel): Promise<boolean> {
		const commentData = await new Comments(data).save()
		return commentData ? true : false
	}

	async find (baseId: string, id: string): Promise<CommentEntity | null> {
		const commentData = await Comments.findOne({_id:id,baseId})
		if(commentData) {
		  const comment: CommentEntity = this.mapper.mapFrom(commentData)
		  return comment
		} 
		
		return null
	}

	async update (baseId: string, id: string, body: string): Promise<boolean> {
		const commentData = await Comments.findOne({_id:id,baseId})
		
		if(commentData) {
		   commentData.body = body ? body : commentData.body
		   return true
		} 
		
		return false
	}
}
