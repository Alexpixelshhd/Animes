const CONFIG = {
    API_BASE: 'https://api.jikan.moe/v4',
    URL_FICHA: 'https://tioanime.com/anime/',
    URL_BUSQUEDA: 'https://tioanime.com/directorio?q='
};

/**
 * Limpia el título para crear una URL válida. 🛠️
 */
function crearSlug(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quita acentos
        .replace(/[^a-z0-9\s-]/g, '') // Quita símbolos raros
        .trim()
        .replace(/\s+/g, '-'); // Espacios por guiones
}

async function cargarContenido(busqueda = '') {
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = Array(10).fill('<div class="h-80 bg-slate-900 animate-pulse rounded-2xl"></div>').join('');

    try {
        const url = busqueda 
            ? `${CONFIG.API_BASE}/anime?q=${encodeURIComponent(busqueda)}&limit=20`
            : `${CONFIG.API_BASE}/top/anime?limit=20`;

        const res = await fetch(url);
        const { data } = await res.json();
        
        renderizar(data);
    } catch (err) {
        contenedor.innerHTML = `<p class="col-span-full text-center py-20 text-red-400">Error de conexión con la API 📡</p>`;
    }
}

function renderizar(items) {
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = '';

    items.forEach(item => {
        const slug = crearSlug(item.title);
        const linkFicha = `${CONFIG.URL_FICHA}${slug}`;
        const linkBusqueda = `${CONFIG.URL_BUSQUEDA}${encodeURIComponent(item.title)}`;

        const card = document.createElement('div');
        card.className = "group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500";
        
        card.innerHTML = `
            <div class="relative aspect-[3/4] overflow-hidden">
                <img src="${item.images.jpg.large_image_url}" loading="lazy" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <p class="text-[10px] text-blue-300 font-bold mb-1 italic">${item.type} • ${item.year || 'N/A'}</p>
                    <p class="text-xs leading-snug line-clamp-4 text-slate-200 mb-4">${item.synopsis || 'Sin descripción'}</p>
                    
                    <div class="grid grid-cols-2 gap-2">
                        <a href="${linkFicha}" target="_blank" class="bg-blue-600 hover:bg-blue-500 text-[10px] font-black py-2 rounded-xl text-center uppercase tracking-widest transition-colors">Directo</a>
                        <a href="${linkBusqueda}" target="_blank" class="bg-slate-800 hover:bg-slate-700 text-[10px] font-black py-2 rounded-xl text-center uppercase tracking-widest transition-colors">Buscar</a>
                    </div>
                </div>

                <div class="absolute top-3 left-3 bg-blue-600 px-2 py-1 rounded-lg text-[10px] font-black shadow-lg">
                    ⭐ ${item.score || '??'}
                </div>
            </div>
            <div class="p-4">
                <h2 class="text-sm font-bold truncate group-hover:text-blue-400 transition-colors">${item.title}</h2>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Evento de búsqueda con retardo (Debounce)
let timer;
document.getElementById('buscador').addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => cargarContenido(e.target.value), 600);
});

// Inicio
cargarContenido();
