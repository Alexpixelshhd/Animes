const API_URL = 'https://api.jikan.moe/v4';
const grilla = document.getElementById('grilla-animes');
const buscador = document.getElementById('input-busqueda');

// Función para obtener datos
async function buscarAnimes(query = '') {
    try {
        grilla.innerHTML = '<p class="col-span-full text-center text-slate-500">Buscando en la base de datos... 📡</p>';
        
        const endpoint = query 
            ? `${API_URL}/anime?q=${encodeURIComponent(query)}&limit=20`
            : `${API_URL}/top/anime?limit=20`;

        const res = await fetch(endpoint);
        const { data } = await res.json();
        
        dibujarCatalogo(data);
    } catch (error) {
        grilla.innerHTML = '<p class="col-span-full text-center text-red-500">Error de conexión 🔌</p>';
    }
}

// Función para mostrar los animes
function dibujarCatalogo(lista) {
    grilla.innerHTML = '';
    
    if (!lista || lista.length === 0) {
        grilla.innerHTML = '<p class="col-span-full text-center">No se encontraron resultados 🕵️‍♂️</p>';
        return;
    }

    lista.forEach(anime => {
        // Enlace al BUSCADOR de TioAnime 📺
        const urlStreaming = `https://tioanime.com/browser?q=${encodeURIComponent(anime.title)}`;

        const card = document.createElement('div');
        card.className = "bg-slate-900 rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform group cursor-pointer";
        
        card.innerHTML = `
            <div class="relative h-72">
                <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <span class="absolute bottom-2 left-2 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded">⭐ ${anime.score || 'N/A'}</span>
            </div>
            <div class="p-3 text-center">
                <h3 class="text-sm font-bold truncate mb-3">${anime.title}</h3>
                <a href="${urlStreaming}" target="_blank" class="block w-full bg-white text-black text-[10px] font-black py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors uppercase">
                    Reproducir 📺
                </a>
            </div>
        `;
        grilla.appendChild(card);
    });
}

// Escuchador del buscador con "Debounce" (espera a que dejes de escribir)
let temporizador;
buscador.addEventListener('input', (e) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        buscarAnimes(e.target.value);
    }, 500);
});

// Carga inicial (Top Animes)
buscarAnimes();
