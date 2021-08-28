import { ICommentRepository } from '../../domain/i-repositories/comment'
import { CommentEntity } from '../../domain/entities/comment'
import { CommentMapper } from '../mappers'
import { CommentFromModel, CommentToModel } from '../models'
import { Comments } from '../mongooseModels'

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

	async get (baseId: string, commentIds?: string[]): Promise<CommentEntity[] | null> {

		const comments: CommentEntity[] = []

		if(commentIds == undefined) {

		 const commentsRaw: CommentFromModel[] | null = await Comments.find({baseId})
		 if(commentsRaw) {

			 for (let index = 0; index < commentsRaw.length; index++) {
				 const commentData = commentsRaw[index]
				 const comment: CommentEntity = this.mapper.mapFrom(commentData)
				 comments.push(comment)
			 }

		   } 

		} else { 
		
		 for (let index = 0; index < commentIds.length; index++) {
			 const commentId = commentIds[index]
			 const commentRaw: CommentFromModel | null = await Comments.findById(commentId)
			
			 if(commentRaw) {
				 const comment: CommentEntity = this.mapper.mapFrom(commentRaw)
				 comments.push(comment)
			 }
		 }
	 }
         
		 return comments

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
