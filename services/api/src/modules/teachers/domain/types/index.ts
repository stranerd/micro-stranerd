export { EmbeddedUser } from '@modules/users'
export { MediaOutput as Media } from '@utils/app/commons'

export enum PostType {
	discussions = 'discussions',
	assignments = 'assignments',
	announcements = 'announcements'
}

export type PostData = {
	type: PostType.discussions
} | {
	type: PostType.announcements
} | {
	type: PostType.assignments,
	assignmentId: string
}

export enum PostMetaType {
	comments = 'comments'
}

export type PostMeta = Record<PostMetaType, number>