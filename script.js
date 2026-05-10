/**
 * ALEX STREAM PRO - SISTEMA DE REDUNDANCIA ⚡
 */

const CONFIG = {
    API_URL: 'https://api.jikan.moe/v4',
    BASE_FICHA: 'https://tioanime.com/anime/'
};

// 1. BASE DE DATOS SIMULADA (Aquí agregarás tus links propios)
// Si no hay links aquí, el sistema usará el link directo por defecto.
const BASE_DATOS_LINKS = {
    "jojos-bizarre-adventure": [
        { nombre: "Fembed", url: "https://www.fembed.com/v/ejemplo1" },
        { nombre: "Mega", url: "https://mega.nz/embed/ejemplo1" }
    ],
    "one-piece": [
        { nombre: "Streamtape", url: "https://streamtape.com/e/ejemplo2" }
    ]
};

/**
 * Convierte títulos a Slugs para links directos 🔗
 */
function crearSlug(titulo) {
    return titulo
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

async function cargarAnimes(busqueda = '') {
    const grilla = document.getElementById('catalogo');
    grilla.innerHTML = '<p class="col-span-full text-center animate-pulse">Sincronizando servidores... 🚀</p>';

    try {
        const endpoint = busqueda 
            ? `${CONFIG.API_URL}/anime?q=${encodeURIComponent(busqueda)}&limit=15`
            : `${CONFIG.API_URL}/top/anime?limit=15`;

        const res = await fetch(endpoint);
        const { data } = await res.json();
        
        renderizarTarjetas(data);
    } catch (error) {
        grilla.innerHTML = '<p class="col-span-full text-center text-red-500">Error de conexión 🔌</p>';
    }
}

function renderizarTarjetas(animes) {
    const grilla = document.getElementById('catalogo');
    grilla.innerHTML = '';

    animes.forEach(anime => {
        const slug = crearSlug(anime.title);
        
        // Verificamos si tenemos links manuales en nuestra "Base de Datos"
        const servidoresPropios = BASE_DATOS_LINKS[slug] || [];
        const linkFichaDirecta = `${CONFIG.BASE_FICHA}${slug}`;

        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all p-4";
        
        // Generamos los botones de servidores dinámicamente
        let botonesServidores = '';
        if (servidoresPropios.length > 0) {
            servidoresPropios.forEach(srv => {
                botonesServidores += `<a href="${srv.url}" target="_blank" class="bg-slate-800 hover:bg-slate-700 text-[9px] py-1 px-2 rounded-md uppercase font-bold">${srv.nombre}</a>`;
            });
        }

        tarjeta.innerHTML = `
            <img src="${anime.images.jpg.large_image_url}" class="w-full h-52 object-cover rounded-2xl mb-4">
            <h3 class="text-xs font-bold truncate mb-3">${anime.title}</h3>
            
            <div class="flex flex-col gap-2">
                <a href="${linkFichaDirecta}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-center py-2 rounded-xl text-[10px] font-black uppercase">
                    Ficha Directa 📺
                </a>
                
                <div class="flex flex-wrap gap-1 justify-center mt-2">
                    ${botonesServidores}
                </div>
            </div>
        `;
        grilla.appendChild(tarjeta);
    });
}

// Buscador
let delay;
document.getElementById('buscador').addEventListener('input', (e) => {
    clearTimeout(delay);
    delay = setTimeout(() => cargarAnimes(e.target.value), 500);
});

cargarAnimes();
