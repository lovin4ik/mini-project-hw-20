import { mainLayout } from './components/layout'
import { movieList } from './components/movieList/movieList'
import './global.css'
import { useDebounce } from './hooks/useDebounce'
import { moviesService } from './services/movies.service'
import type { IMovie } from './types/movie.interface'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = ''

mainLayout().then(html => {
	let currentPage = 1
	document.querySelector<HTMLDivElement>('#app')!.innerHTML = ''
	document.querySelector<HTMLDivElement>('#app')!.appendChild(html)

	const inputLimit =
		document.querySelector<HTMLInputElement>('#inputMoviesLimit')
	const inputPage = document.querySelector<HTMLInputElement>('#inputMoviesPage')
	const fetchButton =
		document.querySelector<HTMLButtonElement>('#buttonLoadMovies')
	const moviesContainer =
		document.querySelector<HTMLDivElement>('#moviesContainer')
	const addMovieBtn = document.querySelector<HTMLButtonElement>('#addMovieBtn')
	const paginationControls = document.querySelector<HTMLDivElement>(
		'#paginationControls'
	)

	if (
		!inputLimit ||
		!inputPage ||
		!fetchButton ||
		!moviesContainer ||
		!addMovieBtn ||
		!paginationControls
	)
		return Error('Some elements not found') as unknown as HTMLDivElement

	inputPage.value = currentPage.toString()

	async function renderMovies() {
		if (!inputLimit || !inputPage || !moviesContainer || !paginationControls)
			return
		const movies = await moviesService.getAllMovies(
			`_per_page=${inputLimit!.value}&_page=${inputPage!.value}`
		)
		const moviesData: IMovie[] = Array.isArray(movies)
			? movies
			: (movies?.data ?? [])

		moviesContainer!.innerHTML = movieList(moviesData)

		paginationControls.innerHTML = `
			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="prevPageBtn">Previous</button>

			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="nextPageBtn">Next</button>
		`

		const prevPageBtn =
			document.querySelector<HTMLButtonElement>('#prevPageBtn')
		const nextPageBtn =
			document.querySelector<HTMLButtonElement>('#nextPageBtn')

		prevPageBtn?.addEventListener('click', async () => {
			if (currentPage > 1) {
				currentPage--
				inputPage!.value = currentPage.toString()
				await renderMovies()
			}
		})

		nextPageBtn?.addEventListener('click', async () => {
			if (currentPage >= movies.pages) return
			currentPage++
			inputPage!.value = currentPage.toString()
			await renderMovies()
		})

		return moviesData
	}

	fetchButton.addEventListener('click', renderMovies)
	;(async () => {
		const searchInput = document.querySelector<HTMLInputElement>('#searchInput')
		const movies = await moviesService.getAllMovies(
			`_per_page=${inputLimit!.value}&_page=${inputPage!.value}`
		)

		const moviesData: IMovie[] = Array.isArray(movies)
			? movies
			: (movies?.data ?? [])

		searchInput?.addEventListener(
			'input',
			useDebounce(async () => {
				if (!searchInput) return
				const query = searchInput.value.trim().toLowerCase()

				const filteredMovies = moviesData.filter(movie => {
					const title = String(movie.title ?? '').toLowerCase()
					const overview = String(movie.overview ?? '').toLowerCase()
					return title.includes(query) || overview.includes(query)
				})

				moviesContainer!.innerHTML = movieList(filteredMovies)
			}, 500)
		)
	})()

	addMovieBtn.addEventListener('click', async () => {
		const backdropContainer = document.createElement('div') as HTMLDivElement

		backdropContainer.className =
			'bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center'
		backdropContainer.innerHTML = `
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Edit movie</h2>

					<form id="createMovieForm" class="flex flex-col items-center justify-center w-96">
						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="title">Title:</label>
							<input type="text" id="title" name="title" class="w-full p-1 rounded bg-secondary/5 border border-secondary/20" />
						</div>

						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="overview">Overview:</label>
							<textarea id="overview" name="overview" class="h-32 w-full resize-none p-1 rounded bg-secondary/5 border border-secondary/20"></textarea>
						</div>

						<button class="bg-secondary/5 rounded px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnCreateMovie" type="submit">Create</button>
					</form>
				</div>
			`

		document.body.appendChild(backdropContainer)
		const closeModalButton =
			backdropContainer.querySelector<HTMLButtonElement>('#closeModal')
		const modalWindow =
			backdropContainer.querySelector<HTMLDivElement>('.modalWindow')

		modalWindow?.addEventListener('click', e => {
			e.stopPropagation()
		})

		backdropContainer.addEventListener('click', () => {
			document.body.removeChild(backdropContainer)
		})

		closeModalButton?.addEventListener('click', () => {
			document.body.removeChild(backdropContainer)
		})

		window.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				document.body.removeChild(backdropContainer)
			}
		})

		const createMovieForm =
			backdropContainer.querySelector<HTMLFormElement>('#createMovieForm')

		createMovieForm?.addEventListener('submit', async e => {
			e.preventDefault()
			const formData = new FormData(createMovieForm!)

			const newMovie: Omit<IMovie, 'id'> = {
				title: formData.get('title') as string,
				overview: formData.get('overview') as string,
				comments: []
			}

			const response = await moviesService.createMovie(newMovie)
			if (response) {
				await renderMovies()
				document.body.removeChild(backdropContainer)
			}
		})
	})

	moviesContainer.addEventListener('click', async e => {
		const target = e.target as HTMLElement

		if (target.closest('#deleteMovie')) {
			const index = target.closest('button')?.getAttribute('data-index')

			const backdropContainer = document.createElement('div') as HTMLDivElement

			backdropContainer.className =
				'bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center'
			backdropContainer.innerHTML = `
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Are you sure you want to delete this movie?</h2>
					<button class="bg-secondary/5 rounded px-2 py-3 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnDeleteMovie">Delete</button>
				</div>
			`

			document.body.appendChild(backdropContainer)
			const closeModalButton =
				backdropContainer.querySelector<HTMLButtonElement>('#closeModal')
			const modalWindow =
				backdropContainer.querySelector<HTMLDivElement>('.modalWindow')

			modalWindow?.addEventListener('click', e => {
				e.stopPropagation()
			})

			backdropContainer.addEventListener('click', () => {
				document.body.removeChild(backdropContainer)
			})

			closeModalButton?.addEventListener('click', () => {
				document.body.removeChild(backdropContainer)
			})

			window.addEventListener('keydown', e => {
				if (e.key === 'Escape') {
					document.body.removeChild(backdropContainer)
				}
			})

			const btnDeleteMovie =
				backdropContainer.querySelector<HTMLButtonElement>('#btnDeleteMovie')

			btnDeleteMovie?.addEventListener('click', async () => {
				if (!index) return

				const response = await moviesService.deleteMovie(index)
				if (response) {
					await renderMovies()
					document.body.removeChild(backdropContainer)
				}
			})
		}

		if (target.closest('#editMovie')) {
			const index = target.closest('button')?.getAttribute('data-index')
			if (!index) return

			const backdropContainer = document.createElement('div') as HTMLDivElement

			const movieData = await moviesService.getMovieById(index)

			backdropContainer.className =
				'bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center'
			backdropContainer.innerHTML = `
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Edit movie</h2>

					<form id="updateMovieForm" class="flex flex-col items-center justify-center w-96">
						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="title">Title:</label>
							<input type="text" id="title" name="title" class="w-full p-1 rounded bg-secondary/5 border border-secondary/20" value="${movieData.title}" />
						</div>

						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="overview">Overview:</label>
							<textarea id="overview" name="overview" class="h-32 w-full resize-none p-1 rounded bg-secondary/5 border border-secondary/20">${movieData.overview}</textarea>
						</div>

						<button class="bg-secondary/5 rounded px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnUpdateMovie" type="submit">Update</button>
					</form>
				</div>
			`

			document.body.appendChild(backdropContainer)
			const closeModalButton =
				backdropContainer.querySelector<HTMLButtonElement>('#closeModal')
			const modalWindow =
				backdropContainer.querySelector<HTMLDivElement>('.modalWindow')

			modalWindow?.addEventListener('click', e => {
				e.stopPropagation()
			})

			backdropContainer.addEventListener('click', () => {
				document.body.removeChild(backdropContainer)
			})

			closeModalButton?.addEventListener('click', () => {
				document.body.removeChild(backdropContainer)
			})

			window.addEventListener('keydown', e => {
				if (e.key === 'Escape') {
					document.body.removeChild(backdropContainer)
				}
			})

			const formUpdate =
				backdropContainer.querySelector<HTMLFormElement>('#updateMovieForm')

			formUpdate?.addEventListener('submit', async e => {
				if (!index) return
				e.preventDefault()
				const formData = new FormData(formUpdate)
				const updatedMovie = {
					title: formData.get('title') as string,
					overview: formData.get('overview') as string
				}

				document.body.removeChild(backdropContainer)

				const response = await moviesService.updateMovie(index, updatedMovie)

				if (response) {
					await renderMovies()
					return response
				}
			})
		}

		if (target.closest('#btnCreateComment')) {
			const index = target.closest('button')?.getAttribute('data-index')
			if (!index) return

			const backdropContainer = document.createElement('div') as HTMLDivElement

			backdropContainer.className =
				'bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center'
			backdropContainer.innerHTML = `
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Create comment</h2>

					<form id="createCommentForm" class="flex flex-col items-center justify-center w-96">
						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="text">Text:</label>
							<input type="text" id="text" name="text" class="w-full p-1 rounded bg-secondary/5 border border-secondary/20" />
						</div>

						<button class="bg-secondary/5 rounded px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnCreateComment" type="submit">Create</button>
					</form>
				</div>
			`

			document.body.appendChild(backdropContainer)
			const closeModalButton =
				backdropContainer.querySelector<HTMLButtonElement>('#closeModal')
			const modalWindow =
				backdropContainer.querySelector<HTMLDivElement>('.modalWindow')

			modalWindow?.addEventListener('click', e => {
				e.stopPropagation()
			})

			backdropContainer.addEventListener('click', () => {
				document.body.removeChild(backdropContainer)
			})

			closeModalButton?.addEventListener('click', () => {
				document.body.removeChild(backdropContainer)
			})

			window.addEventListener('keydown', e => {
				if (e.key === 'Escape') {
					document.body.removeChild(backdropContainer)
				}
			})

			const createCommentForm =
				backdropContainer.querySelector<HTMLFormElement>('#createCommentForm')

			createCommentForm?.addEventListener('submit', async e => {
				if (!index) return
				e.preventDefault()
				const formData = new FormData(createCommentForm)
				const newComment = {
					text: formData.get('text') as string
				}

				document.body.removeChild(backdropContainer)

				const response = await moviesService.createComment(
					index,
					newComment.text
				)

				if (response) {
					await renderMovies()
					return response
				}
			})
		}
	})
})
