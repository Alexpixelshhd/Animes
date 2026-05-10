const CONFIG = {
    API: 'https://api.jikan.moe/v4',
    BASE_ANIME: 'https://tioanime.com/anime/' // Enlace a la ficha técnica
};

/**
 * Convierte el título en un formato de URL (Slug) 🔗
 * Borra símbolos y cambia espacios por guiones.
 */
function limpiarParaLink(titulo) {
    return titulo
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Elimina signos como ' : !
        .trim()
        .replace(/\s+/g, '-');      // Espacios por guiones
}

async function buscarAnimes(query = '') {
    const grilla = document.getElementById('catalogo');
    try {
        const url = query 
            ? `${CONFIG.API}/anime?q=${encodeURIComponent(query)}&limit=15`
            : `${CONFIG.API}/top/anime?limit=15`;

        const respuesta = await fetch(url);
        const { data } = await respuesta.json();
        
        grilla.innerHTML = ''; // Limpiamos la pantalla
        
        data.forEach(anime => {
            // Creamos el link directo usando el título limpio
            const linkDirecto = `${CONFIG.BASE_ANIME}${limpiarParaLink(anime.title)}`;

            const tarjeta = document.createElement('div');
            tarjeta.className = "bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all group";
            
            tarjeta.innerHTML = `
                <div class="relative h-72 overflow-hidden">
                    <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <div class="p-4 text-center">
                    <h3 class="text-xs font-bold truncate mb-4">${anime.title}</h3>
                    <a href="${linkDirecto}" target="_blank" 
                       class="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black py-2.5 rounded-lg transition-colors uppercase">
                       Ver Anime 📺
                    </a>
                </div>
            `;
            grilla.appendChild(tarjeta);
        });
    } catch (e) {
        grilla.innerHTML = '<p class="col-span-full text-center text-red-500">Error de conexión 🔌</p>';
    }
}

// Buscador con retardo
let timeout;
document.getElementById('buscador').addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => buscarAnimes(e.target.value), 500);
});

buscarAnimes();
