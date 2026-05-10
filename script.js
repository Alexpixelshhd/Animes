/**
 * ZENITH STREAM - MOTOR DE BÚSQUEDA PRO 🚀
 */

const CONFIG = {
    API_URL: 'https://api.jikan.moe/v4',
    STREAM_BASE: 'https://tioanime.com/directorio?q='
};

// Memoria local para filtros y detalles
let listaAnimesLocal = []; 

const grilla = document.getElementById('catalogo'); 
const buscador = document.getElementById('buscador'); 

/**
 * Función principal para obtener datos de la API 📡
 */
async function obtenerAnimes(termino = '') {
    try {
        grilla.innerHTML = '<p class="col-span-full text-center text-blue-400 animate-pulse">Sincronizando con el satélite... 🛰️</p>';
        
        const endpoint = termino 
            ? `${CONFIG.API_URL}/anime?q=${encodeURIComponent(termino)}&limit=15`
            : `${CONFIG.API_URL}/top/anime?limit=15`;

        const respuesta = await fetch(endpoint);
        const { data } = await respuesta.json();
        
        // Guardamos en memoria para futuras funciones
        listaAnimesLocal = data; 

        mostrarAnimes(data);
    } catch (error) {
        grilla.innerHTML = '<p class="col-span-full text-center text-red-500 font-bold">Error de señal 🔌</p>';
    }
}

/**
 * Función para crear las tarjetas con EFECTO HOVER 🖼️
 */
function mostrarAnimes(lista) {
    grilla.innerHTML = '';
    
    if (!lista || lista.length === 0) {
        grilla.innerHTML = '<p class="col-span-full text-center opacity-50 text-white">No hay resultados 🕵️‍♂️</p>';
        return;
    }

    lista.forEach(anime => {
        const enlaceFinal = `${CONFIG.STREAM_BASE}${encodeURIComponent(anime.title)}`;
        // Acortamos la sinopsis para que no sature la tarjeta
        const sinopsisCorta = anime.synopsis 
            ? anime.synopsis.substring(0, 150) + "..." 
            : "Sin descripción disponible.";

        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 hover:border-blue-500 transition-all group";
        
        tarjeta.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                
                <div class="absolute inset-0 bg-black/85 p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p class="text-[10px] text-slate-200 leading-relaxed text-center italic">
                        ${sinopsisCorta}
                    </p>
                </div>

                <div class="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-bold text-yellow-400">
                    ⭐ ${anime.score || 'N/A'}
                </div>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-bold truncate text-white mb-4">${anime.title}</h3>
                <a href="${enlaceFinal}" target="_blank" 
                   class="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black py-2.5 rounded-xl transition-colors uppercase tracking-widest">
                   Reproducir 📺
                </a>
            </div>
        `;
        grilla.appendChild(tarjeta);
    });
}

/**
 * Lógica del buscador 🔍
 */
let tiempoEspera;
buscador.addEventListener('input', (e) => {
    clearTimeout(tiempoEspera);
    tiempoEspera = setTimeout(() => {
        obtenerAnimes(e.target.value);
    }, 500);
});

// Arrancamos la aplicación
obtenerAnimes();
