import type { IComment } from './comment.interface'

export interface IMovie {
	id: number
	title: string
	overview: string
	comments: IComment[]
}