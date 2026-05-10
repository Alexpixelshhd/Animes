const API_URL = 'https://api.jikan.moe/v4/top/anime';

async function obtenerAnimes() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        if (datos.data) {
            mostrarAnimes(datos.data);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('anime-container').innerHTML = 
            '<p class="text-red-400">Error al conectar con la base de datos. intenta recargar. 🔄</p>';
    }
}

function mostrarAnimes(listaAnime) {
    const contenedor = document.getElementById('anime-container');
    contenedor.innerHTML = ''; // Limpia el cargando...

    listaAnime.slice(0, 12).forEach(anime => {
        const tarjeta = `
            <div class="anime-card bg-[#161b2c] rounded-xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300">
                <div class="relative overflow-hidden h-72">
                    <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" class="w-full h-full object-cover transition-transform duration-500">
                    <div class="absolute top-2 right-2 bg-blue-600 text-xs font-bold px-2 py-1 rounded shadow-lg">
                        ⭐ ${anime.score || 'N/A'}
                    </div>
                </div>
                <div class="p-5">
                    <h3 class="font-bold text-lg mb-2 line-clamp-1 text-white">${anime.title}</h3>
                    <p class="text-gray-400 text-xs mb-4 line-clamp-3 leading-relaxed">
                        ${anime.synopsis ? anime.synopsis : 'Sin descripción disponible actualmente.'}
                    </p>
                    <a href="${anime.url}" target="_blank" 
                       class="block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wider">
                       Ver Detalles Oficiales
                    </a>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

obtenerAnimes();
