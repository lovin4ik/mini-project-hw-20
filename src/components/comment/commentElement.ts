import type { IComment } from '@/types/comment.interface'

import { useFormatDate } from '@/hooks/useFormatDate'

export const commentElement = (data: IComment) => {
	return `
		<li class="border border-secondary/20 rounded p-2 w-full bg-secondary/5">
			<p>Author: ${data.author}</p>
			<p>Text: ${data.text}</p>
			<p>Created At: ${useFormatDate(data.createdAt)}</p>
		</li>
	`
}
