import type { IComment } from '@/types/comment.interface'

import { commentElement } from './commentElement'

export const commentList = (data: IComment[]) => {
	return `
		<ul class="flex flex-col gap-2">
			${data.map(comment => commentElement(comment)).join('')}
		</ul>
	`
}
