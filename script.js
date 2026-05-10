/**
 * ZENITH STREAM - MOTOR DE BÚSQUEDA 🚀
 */

const CONFIG = {
    API_URL: 'https://api.jikan.moe/v4',
    STREAM_BASE: 'https://tioanime.com/directorio?q='
};

// Seleccionamos los elementos del HTML
const grilla = document.getElementById('catalogo'); // Asegúrate que en HTML sea id="catalogo"
const buscador = document.getElementById('buscador'); // Asegúrate que en HTML sea id="buscador"

/**
 * Función principal para obtener datos de la API 📡
 */
async function obtenerAnimes(termino = '') {
    try {
        // Mensaje de carga
        grilla.innerHTML = '<p class="col-span-full text-center text-blue-400 animate-pulse">Buscando señales en el espacio... 🚀</p>';
        
        // Si hay término busca, si no, trae los populares
        const endpoint = termino 
            ? `${CONFIG.API_URL}/anime?q=${encodeURIComponent(termino)}&limit=15`
            : `${CONFIG.API_URL}/top/anime?limit=15`;

        const respuesta = await fetch(endpoint);
        const { data } = await respuesta.json();
        
        mostrarAnimes(data);
    } catch (error) {
        console.error("Error técnico:", error);
        grilla.innerHTML = '<p class="col-span-full text-center text-red-500 font-bold">Error de conexión 🔌. Revisa tu internet.</p>';
    }
}

/**
 * Función para crear las tarjetas en pantalla 🖼️
 */
function mostrarAnimes(lista) {
    grilla.innerHTML = '';
    
    if (!lista || lista.length === 0) {
        grilla.innerHTML = '<p class="col-span-full text-center opacity-50 text-white">No encontramos ese anime 🕵️‍♂️</p>';
        return;
    }

    lista.forEach(anime => {
        // Construimos el enlace de streaming
        const enlaceFinal = `${CONFIG.STREAM_BASE}${encodeURIComponent(anime.title)}`;

        // Creamos el elemento de la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 hover:border-blue-500 transition-all group";
        
        tarjeta.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-bold text-yellow-400">
                    ⭐ ${anime.score || 'N/A'}
                </div>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-bold truncate text-white mb-4">${anime.title}</h3>
                <a href="${enlaceFinal}" target="_blank" 
                   class="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black py-2.5 rounded-xl transition-colors uppercase tracking-widest">
                   Reproducir Ahora 📺
                </a>
            </div>
        `;
        grilla.appendChild(tarjeta);
    });
}

/**
 * Control del Buscador 🔍
 */
let tiempoEspera;
buscador.addEventListener('input', (e) => {
    clearTimeout(tiempoEspera);
    tiempoEspera = setTimeout(() => {
        obtenerAnimes(e.target.value);
    }, 500); // Espera medio segundo antes de buscar
});

// EXTREMADAMENTE IMPORTANTE: Esta línea arranca todo al cargar la página
obtenerAnimes();
