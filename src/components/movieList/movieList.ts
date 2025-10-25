import type { IMovie } from 'src/types/movie.interface'

import { movieElement } from './movieElement/movieElement'

export const movieList = (data: IMovie[]) => {
	return `
		<ul class="flex flex-col gap-2 justify-center items-center py-6" id="movieList">
			${data.map(movie => movieElement(movie)).join('')}
		</ul>
	`
}
