import type { IComment } from '@/types/comment.interface'

export const commentElement = (data: IComment) => {
	return `
		<li></li>
			<p>${data.text}</p>
		</li>
	`
}
