/**
 * ZENITH STREAM - ENLACES DIRECTOS INTELIGENTES ⚡
 */

const CONFIG = {
    API_URL: 'https://api.jikan.moe/v4',
    // Usamos la base de "anime" para ir directo a la ficha
    BASE_DIRECTA: 'https://tioanime.com/anime/' 
};

const grilla = document.getElementById('catalogo'); 
const buscador = document.getElementById('buscador'); 

/**
 * Función mágica para convertir títulos en URLs (Slugs) 🔗
 * Ejemplo: "Steel Ball Run" -> "steel-ball-run"
 */
function crearSlug(titulo) {
    return titulo
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Elimina símbolos como ' o :
        .trim()
        .replace(/\s+/g, '-');      // Cambia espacios por guiones
}

async function obtenerAnimes(termino = '') {
    try {
        grilla.innerHTML = '<p class="col-span-full text-center text-blue-400">Sincronizando enlaces directos... 🛰️</p>';
        
        const endpoint = termino 
            ? `${CONFIG.API_URL}/anime?q=${encodeURIComponent(termino)}&limit=15`
            : `${CONFIG.API_URL}/top/anime?limit=15`;

        const respuesta = await fetch(endpoint);
        const { data } = await respuesta.json();
        
        mostrarAnimes(data);
    } catch (error) {
        grilla.innerHTML = '<p class="col-span-full text-center text-red-500 font-bold">Error de conexión 🔌</p>';
    }
}

function mostrarAnimes(lista) {
    grilla.innerHTML = '';
    
    lista.forEach(anime => {
        // GENERAMOS EL LINK DIRECTO 🎯
        const slug = crearSlug(anime.title);
        const linkFicha = `${CONFIG.BASE_DIRECTA}${slug}`;

        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 hover:border-blue-500 transition-all group";
        
        tarjeta.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-black/70 p-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p class="text-[10px] text-white text-center">${anime.synopsis?.substring(0, 120) || ''}...</p>
                </div>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-bold truncate text-white mb-4">${anime.title}</h3>
                <a href="${linkFicha}" target="_blank" 
                   class="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black py-2.5 rounded-xl transition-colors uppercase">
                   Ir al Anime 📺
                </a>
            </div>
        `;
        grilla.appendChild(tarjeta);
    });
}

// Lógica del buscador
let tiempoEspera;
buscador.addEventListener('input', (e) => {
    clearTimeout(tiempoEspera);
    tiempoEspera = setTimeout(() => obtenerAnimes(e.target.value), 500);
});

obtenerAnimes();
