const catalogo = document.getElementById('catalogo');
const inputBuscador = document.getElementById('buscador');

// Función para transformar el título en un slug (enlace directo)
function crearSlug(titulo) {
    return titulo
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Quita símbolos
        .replace(/\s+/g, '-');       // Espacios por guiones
}

async function cargarAnimes(termino = '') {
    catalogo.innerHTML = '<p class="col-span-full text-center opacity-50">Cargando...</p>';
    
    const url = termino 
        ? `https://api.jikan.moe/v4/anime?q=${termino}&limit=15`
        : `https://api.jikan.moe/v4/top/anime?limit=15`;

    try {
        const res = await fetch(url);
        const { data } = await res.json();
        renderizar(data);
    } catch (e) {
        catalogo.innerHTML = '<p>Error al conectar con la API 🔌</p>';
    }
}

function renderizar(animes) {
    catalogo.innerHTML = '';
    animes.forEach(anime => {
        // Opción 1: Intentar enlace directo (Slug)
        const slug = crearSlug(anime.title);
        const linkDirecto = `https://tioanime.com/anime/${slug}`;

        catalogo.innerHTML += `
            <div class="anime-card bg-slate-900 rounded-2xl overflow-hidden shadow-2xl transition-all border border-slate-800">
                <div class="h-64 overflow-hidden relative">
                    <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover transition-transform duration-500">
                </div>
                <div class="p-4 text-center">
                    <h3 class="text-sm font-bold truncate mb-3">${anime.title}</h3>
                    <a href="${linkDirecto}" target="_blank" 
                       class="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black py-2 rounded-lg transition-colors">
                       VER AHORA 📺
                    </a>
                </div>
            </div>
        `;
    });
}

// Buscador con retraso
let timer;
inputBuscador.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => cargarAnimes(inputBuscador.value), 500);
});

cargarAnimes();
