// URL de la API para obtener los animes más populares actualmente
const API_URL = 'https://api.jikan.moe/v4/top/anime';

async function obtenerAnimes() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        // Enviamos los datos a la función que los dibuja en pantalla
        mostrarAnimes(datos.data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        document.getElementById('anime-container').innerHTML = '<p>Ups, hubo un error al cargar los datos. 😅</p>';
    }
}

function mostrarAnimes(listaAnime) {
    const contenedor = document.getElementById('anime-container');
    contenedor.innerHTML = ''; // Limpiamos el mensaje de "cargando"

    listaAnime.slice(0, 12).forEach(anime => {
        // Creamos la estructura de la tarjeta profesional
        const tarjeta = `
            <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-2 truncate">${anime.title}</h3>
                    <p class="text-blue-400 text-sm mb-2 font-semibold">⭐ ${anime.score || 'N/A'}</p>
                    <p class="text-gray-400 text-xs mb-4 h-12 overflow-hidden">${anime.synopsis ? anime.synopsis.substring(0, 80) + '...' : 'Sin descripción disponible.'}</p>
                    
                    <a href="${anime.url}" target="_blank" 
                       class="block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">
                       Ver info legal ↗️
                    </a>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

// Ejecutar la función al cargar la página
obtenerAnimes();
