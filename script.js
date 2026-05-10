// CONFIGURACIÓN Y DATOS 🗃️
const CONFIG = {
    API_JIKAN: 'https://api.jikan.moe/v4'
};

// Esta es tu "Base de Datos" Maestra. 
// Aquí pondrás los links que TÚ subas a Mega, Fembed, etc.
const BASE_DATOS_VIDEOS = {
    "jojos-bizarre-adventure": {
        "1": [
            { nombre: "Mega", url: "https://mega.nz/embed/EJEMPLO_1" },
            { nombre: "Fembed", url: "https://www.fembed.com/v/EJEMPLO_1" }
        ]
    },
    "one-piece": {
        "1": [
            { nombre: "Streamtape", url: "https://streamtape.com/e/EJEMPLO_2" }
        ]
    }
};

// FUNCIONES LÓGICAS ⚙️

// 1. Limpiar el nombre para buscarlo en nuestra base de datos
const crearSlug = (texto) => texto.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');

// 2. Cargar el reproductor con los servidores disponibles
function abrirReproductor(slug, titulo) {
    const seccion = document.getElementById('seccion-reproductor');
    const contenedorServidores = document.getElementById('lista-servidores');
    const iframe = document.getElementById('video-player');

    const contenido = BASE_DATOS_VIDEOS[slug];

    if (contenido) {
        seccion.classList.remove('hidden');
        contenedorServidores.innerHTML = '';
        
        // Tomamos los servidores del episodio 1 por defecto
        const servidores = contenido["1"]; 
        
        servidores.forEach((srv, index) => {
            const btn = document.createElement('button');
            btn.className = "bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all";
            btn.innerText = srv.nombre;
            btn.onclick = () => iframe.src = srv.url;
            contenedorServidores.appendChild(btn);

            // Cargar el primero automáticamente
            if (index === 0) iframe.src = srv.url;
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        alert("Aún no hemos subido servidores para: " + titulo);
    }
}

// 3. Renderizar el catálogo (Igual que antes, pero con evento click)
async function obtenerAnimes(q = '') {
    const grilla = document.getElementById('catalogo');
    const url = q ? `${CONFIG.API_JIKAN}/anime?q=${q}&limit=16` : `${CONFIG.API_JIKAN}/top/anime?limit=16`;
    
    const res = await fetch(url);
    const { data } = await res.json();
    
    grilla.innerHTML = '';
    data.forEach(anime => {
        const slug = crearSlug(anime.title);
        const card = document.createElement('div');
        card.className = "bg-slate-900 rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all";
        card.onclick = () => abrirReproductor(slug, anime.title);
        
        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}" class="w-full h-64 object-cover">
            <div class="p-3">
                <h3 class="text-xs font-bold truncate">${anime.title}</h3>
                <p class="text-[10px] text-blue-400 mt-1 uppercase font-black">Ver ahora 📺</p>
            </div>
        `;
        grilla.appendChild(card);
    });
}

// BUSCADOR Y ARRANQUE
document.getElementById('buscador').oninput = (e) => obtenerAnimes(e.target.value);
obtenerAnimes();
