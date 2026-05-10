/**
 * ZENITH STREAM PRO 🚀
 * Sistema de Reproducción con Redundancia y Enlaces Directos
 */

// 1. CONFIGURACIÓN GLOBAL ⚙️
const CONFIG = {
    API_JIKAN: 'https://api.jikan.moe/v4',
    BASE_TIOANIME: 'https://tioanime.com/anime/'
};

// 2. TU BASE DE DATOS DE SERVIDORES 🗄️
// Aquí es donde añadirás tus links de Mega, Fembed, etc.
// Usa el "slug" (nombre en minúsculas y con guiones) como llave.
const MIS_SERVIDORES = {
    "jojos-bizarre-adventure": [
        { servidor: "Mega", url: "https://mega.nz/embed/ejemplo1" },
        { servidor: "Fembed", url: "https://www.fembed.com/v/ejemplo1" }
    ],
    "one-piece": [
        { servidor: "Uptobox", url: "https://uptobox.com/embed/ejemplo2" }
    ]
};

// 3. UTILIDADES 🛠️
const util = {
    // Crea el slug para las URLs
    slugify: (text) => text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-'),
    
    // Genera el HTML de los botones de servidores si existen
    crearBotonesServidores: (slug) => {
        const lista = MIS_SERVIDORES[slug];
        if (!lista) return ''; // Si no hay servidores propios, no devuelve nada
        
        return lista.map(s => `
            <a href="${s.url}" target="_blank" 
               class="bg-slate-800 hover:bg-blue-600 text-[9px] px-2 py-1 rounded font-bold uppercase transition-colors">
               ${s.servidor}
            </a>
        `).join('');
    }
};

// 4. LÓGICA PRINCIPAL 🧠
async function cargarCatalogo(query = '') {
    const grilla = document.getElementById('catalogo');
    grilla.innerHTML = '<div class="col-span-full text-center py-10 opacity-50">Cargando señales... 📡</div>';

    try {
        const url = query 
            ? `${CONFIG.API_JIKAN}/anime?q=${encodeURIComponent(query)}&limit=15`
            : `${CONFIG.API_JIKAN}/top/anime?limit=15`;

        const res = await fetch(url);
        const { data } = await res.json();
        
        renderizar(data);
    } catch (err) {
        grilla.innerHTML = '<div class="col-span-full text-center text-red-400">Error de conexión 🔌</div>';
    }
}

function renderizar(animes) {
    const grilla = document.getElementById('catalogo');
    grilla.innerHTML = '';

    animes.forEach(anime => {
        const slug = util.slugify(anime.title);
        const linkDirecto = `${CONFIG.BASE_TIOANIME}${slug}`;
        const botonesExtra = util.crearBotonesServidores(slug);

        const card = document.createElement('div');
        card.className = "group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all duration-300";
        
        card.innerHTML = `
            <div class="relative aspect-[3/4]">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-yellow-400">⭐ ${anime.score || 'N/A'}</div>
            </div>
            <div class="p-4">
                <h3 class="text-xs font-bold truncate mb-3 text-slate-100">${anime.title}</h3>
                
                <div class="space-y-3">
                    <a href="${linkDirecto}" target="_blank" 
                       class="block w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black py-2 rounded-lg text-center uppercase tracking-widest transition-all">
                       Ver Ficha 📺
                    </a>

                    <div class="flex flex-wrap gap-1 justify-center border-t border-slate-800 pt-3">
                        ${botonesExtra || '<span class="text-[9px] opacity-30 italic">Sin servidores locales</span>'}
                    </div>
                </div>
            </div>
        `;
        grilla.appendChild(card);
    });
}

// 5. EVENTOS ⌨️
let timer;
document.getElementById('buscador').addEventListener('input', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => cargarCatalogo(e.target.value), 500);
});

// Arrancar la app
cargarCatalogo();
