export const mainLayout = async (): Promise<HTMLDivElement> => {
	const div = document.createElement('div')

	div.innerHTML = `
		<h1 class="text-2xl font-bold text-center">Міні проект</h1>

		<div class="container mx-auto mt-4 flex justify-center gap-4">
			<div class="flex flex-col gap-2">
				<label htmlFor="inputMoviesLimit">Limit of movies:</label>
				<input type="number" class="border border-secondary/20 rounded p-2" placeholder="Enter limit of movies:" id="inputMoviesLimit" value="10" required />
			</div>

			<div class="flex flex-col gap-2">
				<label htmlFor="inputMoviesPage">Page number:</label>
				<input type="number" class="border border-secondary/20 rounded p-2" placeholder="Enter page number:" id="inputMoviesPage" value="1" required />
			</div>

			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="buttonLoadMovies">
				Load Movies
			</button>
		</div>

		<div class="container mx-auto flex items-center justify-center gap-4 mt-4">
			<input type="text" class="rounded p-2 border border-secondary/20 bg-transparent outline-none" placeholder="Search movies..." id="searchInput" />

			<button class="cursor-pointer bg-secondary/5 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-secondary/10" id="addMovieBtn">Add movie</button>
		</div>
		<div class="flex flex-col gap-3">
			<div class="mt-4 container mx-auto" id="moviesContainer"></div>
			<div class="flex flex-row justify-center items-center gap-4 mb-4" id="paginationControls"></div>
		</div>
	`

	return div
}
