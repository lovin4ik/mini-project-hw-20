(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const v of s.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&i(v)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const L=async()=>{const o=document.createElement("div");return o.innerHTML=`
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
	`,o},C=o=>`
		<li></li>
			<p>${o.text}</p>
		</li>
	`,E=o=>`
		<ul class="flex flex-col gap-2">
			${o.map(t=>C(t)).join("")}
		</ul>
	`,S=()=>`
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
	`,k=()=>`
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
	`,$=o=>`
		<li class="py-3 px-4 pb-8 pr-12 border border-secondary/20 rounded w-[600px] bg-secondary/1 relative">
			<h2 class="font-bold text-lg mb-0.5">${o.id}. ${o.title}</h2>
			<p>${o.overview}</p>
			<div class="mt-2 flex flex-col gap-2 justify-start items-start">
				<p>Comments:</p>
				<button id="btnCreateComment" data-index="${o.id}" class="bg-secondary/5 rounded cursor-pointer p-2 transition-colors hover:bg-secondary/10">Create comment</button>
				${E(o.comments)}
			</div>
			<div class="absolute right-3 top-3 flex flex-col gap-2">
				<button class="text-red-400 cursor-pointer" id="deleteMovie" data-index="${o.id}">
					${k()}
				</button>
				<button class="cursor-pointer" id="editMovie" data-index="${o.id}">
					${S()}
				</button>
			</div>
		</li>
	`,M=o=>`
		<ul class="flex flex-col gap-2 justify-center items-center py-6" id="movieList">
			${o.map(t=>$(t)).join("")}
		</ul>
	`,q=(o,t)=>{let a;return(...i)=>{clearTimeout(a),a=window.setTimeout(()=>{o.apply(null,i)},t)}};class j{BASE_URL="http://localhost:3000/movies";async getAllMovies(t){return await fetch(`${this.BASE_URL}${t?`?${t}`:""}`).then(i=>i.json())}async getMovieById(t){return await fetch(`${this.BASE_URL}/${t}`).then(i=>i.json())}async deleteMovie(t){return await fetch(`${this.BASE_URL}/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json"}})}async updateMovie(t,a){return await fetch(`${this.BASE_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})}async createMovie(t){return await fetch(this.BASE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async createComment(t,a){const i={id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,text:a,createdAt:new Date().toISOString()},r=await this.getMovieById(t),s=Array.isArray(r.comments)?[...r.comments,i]:[i];return await fetch(`${this.BASE_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({comments:s})})}}const y=new j;document.querySelector("#app").innerHTML="";L().then(o=>{let t=1;document.querySelector("#app").innerHTML="",document.querySelector("#app").appendChild(o);const a=document.querySelector("#inputMoviesLimit"),i=document.querySelector("#inputMoviesPage"),r=document.querySelector("#buttonLoadMovies"),s=document.querySelector("#moviesContainer"),v=document.querySelector("#addMovieBtn"),g=document.querySelector("#paginationControls");if(!a||!i||!r||!s||!v||!g)return Error("Some elements not found");i.value=t.toString();async function b(){if(!a||!i||!s||!g)return;const n=await y.getAllMovies(`_per_page=${a.value}&_page=${i.value}`),c=Array.isArray(n)?n:n?.data??[];s.innerHTML=M(c),g.innerHTML=`
			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="prevPageBtn">Previous</button>

			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="nextPageBtn">Next</button>
		`;const d=document.querySelector("#prevPageBtn"),e=document.querySelector("#nextPageBtn");return d?.addEventListener("click",async()=>{t>1&&(t--,i.value=t.toString(),await b())}),e?.addEventListener("click",async()=>{t>=n.pages||(t++,i.value=t.toString(),await b())}),c}r.addEventListener("click",b),(async()=>{const n=document.querySelector("#searchInput"),c=await y.getAllMovies(`_per_page=${a.value}&_page=${i.value}`),d=Array.isArray(c)?c:c?.data??[];n?.addEventListener("input",q(async()=>{if(!n)return;const e=n.value.trim().toLowerCase(),u=d.filter(m=>{const p=String(m.title??"").toLowerCase(),l=String(m.overview??"").toLowerCase();return p.includes(e)||l.includes(e)});s.innerHTML=M(u)},500))})(),v.addEventListener("click",async()=>{const n=document.createElement("div");n.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",n.innerHTML=`
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
			`,document.body.appendChild(n);const c=n.querySelector("#closeModal");n.querySelector(".modalWindow")?.addEventListener("click",u=>{u.stopPropagation()}),n.addEventListener("click",()=>{document.body.removeChild(n)}),c?.addEventListener("click",()=>{document.body.removeChild(n)}),window.addEventListener("keydown",u=>{u.key==="Escape"&&document.body.removeChild(n)});const e=n.querySelector("#createMovieForm");e?.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(e),p={title:m.get("title"),overview:m.get("overview"),comments:[]};await y.createMovie(p)&&(await b(),document.body.removeChild(n))})}),s.addEventListener("click",async n=>{const c=n.target;if(c.closest("#deleteMovie")){const d=c.closest("button")?.getAttribute("data-index"),e=document.createElement("div");e.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",e.innerHTML=`
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Are you sure you want to delete this movie?</h2>
					<button class="bg-secondary/5 rounded px-2 py-3 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnDeleteMovie">Delete</button>
				</div>
			`,document.body.appendChild(e);const u=e.querySelector("#closeModal");e.querySelector(".modalWindow")?.addEventListener("click",l=>{l.stopPropagation()}),e.addEventListener("click",()=>{document.body.removeChild(e)}),u?.addEventListener("click",()=>{document.body.removeChild(e)}),window.addEventListener("keydown",l=>{l.key==="Escape"&&document.body.removeChild(e)}),e.querySelector("#btnDeleteMovie")?.addEventListener("click",async()=>{if(!d)return;await y.deleteMovie(d)&&(await b(),document.body.removeChild(e))})}if(c.closest("#editMovie")){const d=c.closest("button")?.getAttribute("data-index");if(!d)return;const e=document.createElement("div"),u=await y.getMovieById(d);e.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",e.innerHTML=`
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Edit movie</h2>

					<form id="updateMovieForm" class="flex flex-col items-center justify-center w-96">
						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="title">Title:</label>
							<input type="text" id="title" name="title" class="w-full p-1 rounded bg-secondary/5 border border-secondary/20" value="${u.title}" />
						</div>

						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="overview">Overview:</label>
							<textarea id="overview" name="overview" class="h-32 w-full resize-none p-1 rounded bg-secondary/5 border border-secondary/20">${u.overview}</textarea>
						</div>

						<button class="bg-secondary/5 rounded px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnUpdateMovie" type="submit">Update</button>
					</form>
				</div>
			`,document.body.appendChild(e);const m=e.querySelector("#closeModal");e.querySelector(".modalWindow")?.addEventListener("click",f=>{f.stopPropagation()}),e.addEventListener("click",()=>{document.body.removeChild(e)}),m?.addEventListener("click",()=>{document.body.removeChild(e)}),window.addEventListener("keydown",f=>{f.key==="Escape"&&document.body.removeChild(e)});const l=e.querySelector("#updateMovieForm");l?.addEventListener("submit",async f=>{if(!d)return;f.preventDefault();const h=new FormData(l),x={title:h.get("title"),overview:h.get("overview")};document.body.removeChild(e);const w=await y.updateMovie(d,x);if(w)return await b(),w})}if(c.closest("#btnCreateComment")){const d=c.closest("button")?.getAttribute("data-index");if(!d)return;const e=document.createElement("div");e.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",e.innerHTML=`
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
			`,document.body.appendChild(e);const u=e.querySelector("#closeModal");e.querySelector(".modalWindow")?.addEventListener("click",l=>{l.stopPropagation()}),e.addEventListener("click",()=>{document.body.removeChild(e)}),u?.addEventListener("click",()=>{document.body.removeChild(e)}),window.addEventListener("keydown",l=>{l.key==="Escape"&&document.body.removeChild(e)});const p=e.querySelector("#createCommentForm");p?.addEventListener("submit",async l=>{if(!d)return;l.preventDefault();const h={text:new FormData(p).get("text")};document.body.removeChild(e);const x=await y.createComment(d,h.text);if(x)return await b(),x})}})});
