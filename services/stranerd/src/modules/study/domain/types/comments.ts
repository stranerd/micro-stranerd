export enum CommentType {
	video = 'video'
}

type VideoType = {
	type: CommentType.video
	videoId: string
}

export type CommentData = VideoType