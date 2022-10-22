import { IPostRepository } from '../../domain/irepositories/posts'
import { PostMapper } from '../mappers/posts'
import { PostFromModel, PostToModel } from '../models/posts'
import { Post } from '../mongooseModels/posts'
import { parseQueryParams, QueryParams } from '@utils/app/package'
import { EmbeddedUser, PostMetaType } from '../../domain/types'

export class PostRepository implements IPostRepository {
	private static instance: PostRepository
	private mapper: PostMapper

	private constructor () {
		this.mapper = new PostMapper()
	}

	static getInstance () {
		if (!PostRepository.instance) PostRepository.instance = new PostRepository()
		return PostRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<PostFromModel>(Post, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: PostToModel) {
		const post = await new Post(data).save()
		return this.mapper.mapFrom(post)!
	}

	async find (id: string) {
		const post = await Post.findById(id)
		return this.mapper.mapFrom(post)
	}

	async update (courseId: string, id: string, userId: string, data: Partial<PostToModel>) {
		const post = await Post.findOneAndUpdate({
			_id: id, courseId,
			'user.id': userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(post)
	}

	async updateUserBio (user: EmbeddedUser) {
		const posts = await Post.updateMany({ 'user.id': user.id }, { $set: { user } })
		return posts.acknowledged
	}

	async delete (courseId: string, id: string, userId: string) {
		const post = await Post.findOneAndDelete({ _id: id, courseId, 'user.id': userId })
		return !!post
	}

	async updateMembers (courseId: string, members: string[]) {
		const res = await Post.updateMany({ courseId }, { $set: { members } }, { new: true })
		return res.acknowledged
	}

	async deleteCoursePosts (courseId: string) {
		const res = await Post.deleteMany({ courseId })
		return res.acknowledged
	}

	async updateMeta (id: string, property: PostMetaType, value: 1 | -1) {
		const post = await Post.findByIdAndUpdate(id, {
			$inc: { [`meta.${property}`]: value }
		})
		return !!post
	}
}
