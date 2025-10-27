(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const b of s.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&r(b)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const C=async()=>{const o=document.createElement("div");return o.innerHTML=`
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
			<div class="mt-4" id="moviesInfoPage"></div>
			<div class="mt-2 container mx-auto" id="moviesContainer"></div>
			<div class="flex flex-row justify-center items-center gap-4 mb-4" id="paginationControls"></div>
		</div>
	`,o},E=o=>{const t=new Date(o),a=["January","February","March","April","May","June","July","August","September","October","November","December"],r=t.getDate(),i=a[t.getMonth()],s=t.getFullYear();return`${r} ${i} ${s} year`},S=o=>`
		<li class="border border-secondary/20 rounded p-2 w-full bg-secondary/5">
			<p>Author: ${o.author}</p>
			<p>Text: ${o.text}</p>
			<p>Created At: ${E(o.createdAt)}</p>
		</li>
	`,$=o=>`
		<ul class="flex flex-col gap-2">
			${o.map(t=>S(t)).join("")}
		</ul>
	`,k=()=>`
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
	`,A=()=>`
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
	`,q=o=>`
		<li class="py-3 px-4 pb-8 pr-12 border border-secondary/20 rounded w-[600px] bg-secondary/1 relative">
			<h2 class="font-bold text-lg mb-0.5">${o.id}. ${o.title}</h2>
			<p>${o.overview}</p>
			<div class="mt-2 flex flex-col gap-2 justify-start items-start">
				<p>Comments:</p>
				<button id="btnCreateComment" data-index="${o.id}" class="bg-secondary/5 rounded cursor-pointer p-2 transition-colors hover:bg-secondary/10">Create comment</button>
				${$(o.comments)}
			</div>
			<div class="absolute right-3 top-3 flex flex-col gap-2">
				<button class="text-red-400 cursor-pointer" id="deleteMovie" data-index="${o.id}">
					${A()}
				</button>
				<button class="cursor-pointer" id="editMovie" data-index="${o.id}">
					${k()}
				</button>
			</div>
		</li>
	`,L=o=>`
		<ul class="flex flex-col gap-2 justify-center items-center py-6" id="movieList">
			${o.map(t=>q(t)).join("")}
		</ul>
	`,P=(o,t)=>{let a;return(...r)=>{clearTimeout(a),a=window.setTimeout(()=>{o.apply(null,r)},t)}};class j{BASE_URL="http://localhost:3000/movies";async getAllMovies(t){return await fetch(`${this.BASE_URL}${t?`?${t}`:""}`).then(r=>r.json())}async getMovieById(t){return await fetch(`${this.BASE_URL}/${t}`).then(r=>r.json())}async deleteMovie(t){return await fetch(`${this.BASE_URL}/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json"}})}async updateMovie(t,a){return await fetch(`${this.BASE_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})}async createMovie(t){return await fetch(this.BASE_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async createComment(t,a){const r={id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,author:a.author,text:a.text,createdAt:new Date().toISOString()},i=await this.getMovieById(t),s=Array.isArray(i.comments)?[...i.comments,r]:[r];return await fetch(`${this.BASE_URL}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({comments:s})})}}const f=new j;document.querySelector("#app").innerHTML="";C().then(o=>{let t=1;document.querySelector("#app").innerHTML="",document.querySelector("#app").appendChild(o);const a=document.querySelector("#inputMoviesLimit"),r=document.querySelector("#inputMoviesPage"),i=document.querySelector("#buttonLoadMovies"),s=document.querySelector("#moviesContainer"),b=document.querySelector("#addMovieBtn"),x=document.querySelector("#paginationControls"),w=document.querySelector("#moviesInfoPage");if(!a||!r||!i||!s||!b||!x||!w)return Error("Some elements not found");r.value=t.toString();async function y(){if(!a||!r||!s||!x||!w)return;t=Number(r.value);const n=await f.getAllMovies(`_per_page=${a.value}&_page=${r.value}`),c=Array.isArray(n)?n:n?.data??[];s.innerHTML=L(c),w.innerHTML=`
			<p class="text-center">Page ${t} of ${n.pages} | Total movies: ${n.items}</p>
		`,x.innerHTML=`
			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="prevPageBtn">Previous</button>

			<button class="bg-secondary/5 text-white py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="nextPageBtn">Next</button>
		`;const l=document.querySelector("#prevPageBtn"),e=document.querySelector("#nextPageBtn");return l?.addEventListener("click",async()=>{t>1&&(t--,r.value=t.toString(),await y())}),e?.addEventListener("click",async()=>{t>=n.pages||(t++,r.value=t.toString(),await y())}),c}i.addEventListener("click",y),(async()=>{const n=document.querySelector("#searchInput"),c=await f.getAllMovies(`_per_page=${a.value}&_page=${r.value}`),l=Array.isArray(c)?c:c?.data??[];n?.addEventListener("input",P(async()=>{if(!n)return;const e=n.value.trim().toLowerCase(),u=l.filter(m=>{const p=String(m.title??"").toLowerCase(),d=String(m.overview??"").toLowerCase();return p.includes(e)||d.includes(e)});s.innerHTML=L(u)},500))})(),b.addEventListener("click",async()=>{const n=document.createElement("div");n.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",n.innerHTML=`
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
			`,document.body.appendChild(n);const c=n.querySelector("#closeModal");n.querySelector(".modalWindow")?.addEventListener("click",u=>{u.stopPropagation()}),n.addEventListener("click",()=>{document.body.removeChild(n)}),c?.addEventListener("click",()=>{document.body.removeChild(n)}),window.addEventListener("keydown",u=>{u.key==="Escape"&&document.body.removeChild(n)});const e=n.querySelector("#createMovieForm");e?.addEventListener("submit",async u=>{u.preventDefault();const m=new FormData(e),p={title:m.get("title"),overview:m.get("overview"),comments:[]};await f.createMovie(p)&&(await y(),document.body.removeChild(n))})}),s.addEventListener("click",async n=>{const c=n.target;if(c.closest("#deleteMovie")){const l=c.closest("button")?.getAttribute("data-index"),e=document.createElement("div");e.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",e.innerHTML=`
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Are you sure you want to delete this movie?</h2>
					<button class="bg-secondary/5 rounded px-2 py-3 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnDeleteMovie">Delete</button>
				</div>
			`,document.body.appendChild(e);const u=e.querySelector("#closeModal");e.querySelector(".modalWindow")?.addEventListener("click",d=>{d.stopPropagation()}),e.addEventListener("click",()=>{document.body.removeChild(e)}),u?.addEventListener("click",()=>{document.body.removeChild(e)}),window.addEventListener("keydown",d=>{d.key==="Escape"&&document.body.removeChild(e)}),e.querySelector("#btnDeleteMovie")?.addEventListener("click",async()=>{if(!l)return;await f.deleteMovie(l)&&(await y(),document.body.removeChild(e))})}if(c.closest("#editMovie")){const l=c.closest("button")?.getAttribute("data-index");if(!l)return;const e=document.createElement("div"),u=await f.getMovieById(l);e.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",e.innerHTML=`
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
			`,document.body.appendChild(e);const m=e.querySelector("#closeModal");e.querySelector(".modalWindow")?.addEventListener("click",v=>{v.stopPropagation()}),e.addEventListener("click",()=>{document.body.removeChild(e)}),m?.addEventListener("click",()=>{document.body.removeChild(e)}),window.addEventListener("keydown",v=>{v.key==="Escape"&&document.body.removeChild(e)});const d=e.querySelector("#updateMovieForm");d?.addEventListener("submit",async v=>{if(!l)return;v.preventDefault();const h=new FormData(d),g={title:h.get("title"),overview:h.get("overview")};document.body.removeChild(e);const M=await f.updateMovie(l,g);if(M)return await y(),M})}if(c.closest("#btnCreateComment")){const l=c.closest("button")?.getAttribute("data-index");if(!l)return;const e=document.createElement("div");e.className="bg-black/30 fixed top-0 left-0 w-full h-full flex justify-center items-center",e.innerHTML=`
				<div class="modalWindow bg-primary p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative">
					<button class="absolute top-1 right-2 text-white text-xl cursor-pointer" id="closeModal">x</button>
					<h2 class="text-xl mb-4">Create comment</h2>

					<form id="createCommentForm" class="flex flex-col items-center justify-center w-96">
						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="author">Author:</label>
							<input type="text" id="author" name="author" class="w-full p-1 rounded bg-secondary/5 border border-secondary/20" />
						</div>

						<div class="flex flex-col mb-2 w-full">
							<label htmlFor="text">Text:</label>
							<input type="text" id="text" name="text" class="w-full p-1 rounded bg-secondary/5 border border-secondary/20" />
						</div>

						<button class="bg-secondary/5 rounded px-3 py-2 cursor-pointer transition-colors duration-300 hover:bg-secondary/10" id="btnCreateComment" type="submit">Create</button>
					</form>
				</div>
			`,document.body.appendChild(e);const u=e.querySelector("#closeModal");e.querySelector(".modalWindow")?.addEventListener("click",d=>{d.stopPropagation()}),e.addEventListener("click",()=>{document.body.removeChild(e)}),u?.addEventListener("click",()=>{document.body.removeChild(e)}),window.addEventListener("keydown",d=>{d.key==="Escape"&&document.body.removeChild(e)});const p=e.querySelector("#createCommentForm");p?.addEventListener("submit",async d=>{if(!l)return;d.preventDefault();const v=new FormData(p),h={text:v.get("text"),author:v.get("author")};document.body.removeChild(e);const g=await f.createComment(l,h);if(g)return await y(),g})}})});
