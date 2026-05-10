// Configuración de la API y estado de la aplicación
const API_BASE = 'https://api.jikan.moe/v4';
let currentData = []; // Guardaremos los datos aquí para filtrar rápido

// 1. Función principal para obtener datos
async function fetchAnime(endpoint = '/top/anime', query = '') {
    const container = document.getElementById('anime-container');
    const url = query ? `${API_BASE}/anime?q=${query}&order_by=score&sort=desc` : `${API_BASE}${endpoint}`;
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        currentData = json.data || [];
        renderCards(currentData);
    } catch (error) {
        console.error("Error cargando datos:", error);
        container.innerHTML = `<p class="text-red-400 col-span-full text-center">Error de conexión. Reintenta en unos momentos. 🔄</p>`;
    }
}

// 2. Función para "dibujar" las tarjetas en el HTML
function renderCards(data) {
    const container = document.getElementById('anime-container');
    container.innerHTML = ''; // Limpiar cargando

    if (data.length === 0) {
        container.innerHTML = `<p class="text-gray-500 col-span-full text-center py-10">No encontramos resultados para tu búsqueda. 🔍</p>`;
        return;
    }

    data.slice(0, 16).forEach(anime => {
        const card = `
            <div class="anime-card bg-[#111625] rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 shadow-lg group">
                <div class="relative h-64 overflow-hidden">
                    <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg shadow-xl">
                        ⭐ ${anime.score || 'N/A'}
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="font-bold text-lg mb-2 line-clamp-1 text-white group-hover:text-blue-400 transition-colors">${anime.title}</h3>
                    <p class="text-gray-400 text-xs mb-5 line-clamp-2 leading-relaxed">
                        ${anime.synopsis || 'Sin descripción disponible.'}
                    </p>
                    <a href="${anime.url}" target="_blank" class="block w-full text-center bg-gray-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest shadow-inner">
                        Ver Detalles Legales
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 3. Lógica del Buscador (Escucha mientras escribes)
const searchInput = document.getElementById('search-input');
let debounceTimer;

searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    
    // Esperamos 500ms para no saturar la API con cada letra
    debounceTimer = setTimeout(() => {
        if (query.length > 2) {
            fetchAnime('/anime', query);
        } else if (query.length === 0) {
            fetchAnime(); // Vuelve a tendencias si está vacío
        }
    }, 500);
});

// Inicializar la carga de tendencias
fetchAnime();
