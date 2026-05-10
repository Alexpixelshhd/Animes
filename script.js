/**
 * ZENITH ANIME PRO - MOTOR DE STREAMING DIRECTO 📺
 */

const API_BASE = 'https://api.jikan.moe/v4';
const contenedor = document.getElementById('grilla-animes');
const buscador = document.getElementById('input-busqueda');

async function obtenerAnimes(nombre = '') {
    try {
        contenedor.innerHTML = '<div class="col-span-full text-center py-20 animate-pulse text-blue-500 font-bold uppercase tracking-widest">Sincronizando señal... 📡</div>';
        
        const url = nombre 
            ? `${API_BASE}/anime?q=${encodeURIComponent(nombre)}&limit=15`
            : `${API_BASE}/top/anime?limit=15`;

        const respuesta = await fetch(url);
        const { data } = await respuesta.json();
        
        renderizar(data);
    } catch (error) {
        contenedor.innerHTML = '<p class="col-span-full text-center text-red-500 font-bold">Error de conexión 🔌</p>';
    }
}

function renderizar(animes) {
    contenedor.innerHTML = '';
    
    if (!animes || animes.length === 0) {
        contenedor.innerHTML = '<p class="col-span-full text-center py-10 opacity-50 text-white">No se encontraron resultados 🕵️‍♂️</p>';
        return;
    }

    animes.forEach(anime => {
        // ENLACE AL BUSCADOR INTERNO DE TIOANIME 🔗
        // Esto envía el nombre directamente al buscador del sitio
        const urlStreaming = `https://tioanime.com/browser?q=${encodeURIComponent(anime.title)}`;

        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-3 shadow-lg hover:border-blue-500 transition-all group";
        
        tarjeta.innerHTML = `
            <div class="relative h-64 overflow-hidden rounded-xl mb-3">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white">
                    ${anime.type || 'TV'}
                </div>
            </div>
            <h3 class="font-bold text-sm truncate text-white mb-3">${anime.title}</h3>
            <div class="flex justify-between items-center">
                <span class="text-xs font-black text-blue-400">⭐ ${anime.score || 'N/A'}</span>
                <a href="${urlStreaming}" target="_blank" class="text-[10px] bg-blue-600 px-4 py-2 rounded-lg font-black hover:bg-blue-700 transition-all text-white uppercase tracking-tighter">
                    Ver ahora
                </a>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Escuchador del buscador
let timer;
buscador.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        obtenerAnimes(e.target.value);
    }, 500);
});

// Carga inicial
obtenerAnimes();
