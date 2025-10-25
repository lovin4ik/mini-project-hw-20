import { commentList } from '@/components/comment/commentList'
import { pencil } from '@/components/svg/pencil'
import { trash2 } from '@/components/svg/trash2'

import type { IMovie } from '@/types/movie.interface'

export const movieElement = (data: IMovie) => {
	return `
		<li class="py-3 px-4 pb-8 pr-12 border border-secondary/20 rounded w-[600px] bg-secondary/1 relative">
			<h2 class="font-bold text-lg mb-0.5">${data.id}. ${data.title}</h2>
			<p>${data.overview}</p>
			<div class="mt-2 flex flex-col gap-2 justify-start items-start">
				<p>Comments:</p>
				<button id="btnCreateComment" data-index="${data.id}" class="bg-secondary/5 rounded cursor-pointer p-2 transition-colors hover:bg-secondary/10">Create comment</button>
				${commentList(data.comments)}
			</div>
			<div class="absolute right-3 top-3 flex flex-col gap-2">
				<button class="text-red-400 cursor-pointer" id="deleteMovie" data-index="${data.id}">
					${trash2()}
				</button>
				<button class="cursor-pointer" id="editMovie" data-index="${data.id}">
					${pencil()}
				</button>
			</div>
		</li>
	`
}
