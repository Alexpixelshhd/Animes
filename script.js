/**
 * ZENITH ANIME PRO - MOTOR DE STREAMING 🚀
 */

const API_BASE = 'https://api.jikan.moe/v4';
const contenedor = document.getElementById('grilla-animes');
const buscador = document.getElementById('input-busqueda');

// 1. Función para conectar con la API
async function obtenerAnimes(nombre = '') {
    try {
        contenedor.innerHTML = '<p class="col-span-full text-center animate-pulse">Sincronizando señal... 📡</p>';
        
        // Si hay nombre, busca; si no, trae los populares
        const url = nombre 
            ? `${API_BASE}/anime?q=${encodeURIComponent(nombre)}&limit=15`
            : `${API_BASE}/top/anime?limit=15`;

        const respuesta = await fetch(url);
        const { data } = await respuesta.json();
        
        renderizar(data);
    } catch (error) {
        contenedor.innerHTML = '<p class="col-span-full text-center text-red-500">Error de conexión 🔌</p>';
    }
}

// 2. Función para dibujar la interfaz
function renderizar(animes) {
    contenedor.innerHTML = '';
    
    if (!animes || animes.length === 0) {
        contenedor.innerHTML = '<p class="col-span-full text-center">No se encontró el anime 🕵️‍♂️</p>';
        return;
    }

    animes.forEach(anime => {
        // CONSTRUCCIÓN DEL ENLACE 🔗
        // Usamos la estructura de búsqueda de Google limitada solo a AnimeFLV para evitar bloqueos
        const urlStreaming = `https://www.google.com/search?q=site:animeflv.net+${encodeURIComponent(anime.title)}`;

        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-3 shadow-lg hover:border-blue-500 transition-all";
        
        tarjeta.innerHTML = `
            <div class="relative h-64 overflow-hidden rounded-xl mb-3">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover">
            </div>
            <h3 class="font-bold text-sm truncate text-white mb-3">${anime.title}</h3>
            <div class="flex justify-between items-center">
                <span class="text-xs font-black text-blue-400">⭐ ${anime.score || 'N/A'}</span>
                <a href="${urlStreaming}" target="_blank" class="text-[10px] bg-blue-600 px-4 py-2 rounded-lg font-black hover:bg-blue-700 transition-all text-white">
                    VER AHORA 📺
                </a>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// 3. Escuchador del buscador (con retraso para no saturar)
let timer;
buscador.addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        obtenerAnimes(e.target.value);
    }, 500);
});

// Inicio inicial
obtenerAnimes();
