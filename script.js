/**
 * ZENITH ANIME PRO - MOTOR DE STREAMING DIRECTO 🚀
 */

const API_BASE = 'https://api.jikan.moe/v4';
const contenedor = document.getElementById('grilla-animes');
const buscador = document.getElementById('input-busqueda');

/**
 * Transforma un título en un formato amigable para URLs (Slug) 🔗
 * Ejemplo: "Sousou no Frieren" -> "sousou-no-frieren"
 */
function generarSlug(titulo) {
    return titulo
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '') // Elimina símbolos como : ! ?
        .replace(/\s+/g, '-');       // Reemplaza espacios por guiones
}

async function obtenerAnimes(nombre = '') {
    try {
        contenedor.innerHTML = '<div class="col-span-full text-center py-20 animate-pulse text-blue-500 font-bold">BUSCANDO SEÑAL... 📡</div>';
        
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
        contenedor.innerHTML = '<p class="col-span-full text-center py-10 opacity-50">No se encontraron resultados 🕵️‍♂️</p>';
        return;
    }

    animes.forEach(anime => {
        // Generamos el enlace directo usando nuestra nueva función
        const slug = generarSlug(anime.title);
        const urlStreaming = `https://tioanime.com/anime/${slug}`;

        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-3 shadow-lg hover:border-blue-500 transition-all group";
        
        tarjeta.innerHTML = `
            <div class="relative h-64 overflow-hidden rounded-xl mb-3">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span class="text-white text-xs font-bold">Ver en TioAnime 📺</span>
                </div>
            </div>
            <h3 class="font-bold text-sm truncate text-white mb-3">${anime.title}</h3>
            <div class="flex justify-between items-center">
                <span class="text-xs font-black text-yellow-400">⭐ ${anime.score || 'N/A'}</span>
                <a href="${urlStreaming}" target="_blank" class="text-[10px] bg-blue-600 px-4 py-2 rounded-lg font-black hover:bg-blue-700 transition-all text-white uppercase">
                    Ver Ahora
                </a>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Lógica del buscador
let timer;
buscador.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        obtenerAnimes(e.target.value);
    }, 500);
});

// Carga inicial
obtenerAnimes();
