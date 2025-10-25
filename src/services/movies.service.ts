import type { IMovie } from '@/types/movie.interface'

class MoviesService {
	private BASE_URL = 'http://localhost:3000/movies'

	async getAllMovies(params?: string) {
		const response = await fetch(
			`${this.BASE_URL}${params ? `?${params}` : ''}`
		).then(res => res.json())

		return response
	}

	async getMovieById(id: string) {
		const response = await fetch(`${this.BASE_URL}/${id}`).then(res =>
			res.json()
		)

		return response
	}

	async deleteMovie(id: string) {
		const response = await fetch(`${this.BASE_URL}/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		return response
	}

	async updateMovie(id: string, data: Partial<IMovie>) {
		const response = await fetch(`${this.BASE_URL}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		return response
	}

	async createMovie(data: Omit<IMovie, 'id'>) {
		const response = await fetch(this.BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		return response
	}

	async createComment(movieId: string, commentText: string) {
		const comment = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			text: commentText,
			createdAt: new Date().toISOString()
		}

		const movie: IMovie = await this.getMovieById(movieId)

		const comments = Array.isArray(movie.comments)
			? [...movie.comments, comment]
			: [comment]

		const response = await fetch(`${this.BASE_URL}/${movieId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				comments
			})
		})

		return response
	}
}

export const moviesService = new MoviesService()
