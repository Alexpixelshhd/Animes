/**
 * ZENITH ANIME PRO - MOTOR PRINCIPAL ⚙️
 */

// 1. Configuración inicial
const API_BASE = 'https://api.jikan.moe/v4';
const contenedor = document.getElementById('grilla-animes');

// 2. Función para conectar con la API
async function obtenerAnimes() {
    try {
        // Mostramos un mensaje de carga mientras esperamos
        contenedor.innerHTML = '<p class="col-span-full text-center">Cargando catálogo... 📡</p>';

        // Pedimos los 15 animes más populares
        const respuesta = await fetch(`${API_BASE}/top/anime?limit=15`);
        const resultado = await respuesta.json();
        
        // Enviamos los datos a la función que dibuja las tarjetas
        dibujarTarjetas(resultado.data);

    } catch (error) {
        console.error("Fallo de conexión:", error);
        contenedor.innerHTML = '<p class="col-span-full text-center text-red-500">Error al conectar con la base de datos 🔌</p>';
    }
}

// 3. Función para crear las tarjetas en el HTML
function dibujarTarjetas(listaDeAnimes) {
    // Limpiamos el contenedor
    contenedor.innerHTML = '';

    // Usamos un bucle para recorrer cada anime de la lista
    listaDeAnimes.forEach(anime => {
        
        // Preparamos el enlace de búsqueda para AnimeFLV 📺
        const urlStreaming = `https://www.google.com/search?q=site:animeflv.net+${encodeURIComponent(anime.title)}`;
        
        // Creamos la estructura de la tarjeta
        const tarjeta = `
            <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-3 shadow-lg hover:border-blue-500 transition-all">
                <div class="relative h-64 overflow-hidden rounded-xl mb-3">
                    <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover">
                </div>
                <h3 class="font-bold text-sm truncate text-white mb-3">${anime.title}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-xs font-black text-blue-400">⭐ ${anime.score || 'N/A'}</span>
                    <a href="${urlStreaming}" target="_blank" class="text-[10px] bg-blue-600 px-4 py-2 rounded-lg font-black hover:bg-blue-700 transition-all text-white">
                        VER AHORA 📺
                    </a>
                </div>
            </div>
        `;

        // Inyectamos la tarjeta en el contenedor
        contenedor.innerHTML += tarjeta;
    });
}

// 4. Encendemos el motor
obtenerAnimes();
