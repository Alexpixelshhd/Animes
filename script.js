/**
 * ZENITH ANIME PRO - CORE ENGINE ⚙️
 * Un motor robusto para una experiencia fluida.
 */

const ZenithApp = {
    // --- Configuración ---
    API_BASE: 'https://api.jikan.moe/v4',
    grid: document.getElementById('grilla-animes'),
    input: document.getElementById('input-busqueda'),
    notificacion: document.getElementById('notificacion'),
    
    // --- Estado de la App ---
    estado: {
        busquedaActual: '',
        generoActual: '',
        favoritos: JSON.parse(localStorage.getItem('zenith_favs')) || []
    },

    // --- Inicialización ---
    init() {
        console.log("🚀 Motor Zenith Iniciado...");
        this.escucharEventos();
        this.cargarAnimes(); // Carga inicial
    },

    // --- Controladores de Eventos ---
    escucharEventos() {
        // Buscador con Debounce (600ms)
        let timer;
        this.input.addEventListener('input', (e) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.estado.busquedaActual = e.target.value.trim();
                this.cargarAnimes();
            }, 600);
        });

        // Filtros de Género
        document.querySelectorAll('.btn-filtro').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Estética de botones
                document.querySelectorAll('.btn-filtro').forEach(b => b.classList.replace('bg-blue-600', 'bg-slate-900'));
                e.target.classList.replace('bg-slate-900', 'bg-blue-600');
                
                this.estado.generoActual = e.target.dataset.genre;
                this.estado.busquedaActual = ''; // Limpiar búsqueda al filtrar
                this.input.value = '';
                this.cargarAnimes();
            });
        });
    },

    // --- Lógica de Datos (API) ---
    async cargarAnimes() {
        this.mostrarCarga(true);
        
        // Construcción inteligente de la URL
        let url = `${this.API_BASE}/top/anime?limit=15`;
        
        if (this.estado.busquedaActual) {
            url = `${this.API_BASE}/anime?q=${this.estado.busquedaActual}&limit=15`;
        } else if (this.estado.generoActual) {
            url = `${this.API_BASE}/anime?genres=${this.estado.generoActual}&order_by=score&sort=desc&limit=15`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Error en servidor");
            const { data } = await res.json();
            this.renderizar(data);
        } catch (err) {
            this.mostrarError();
        }
    },

    // --- Renderizado de UI ---
    renderizar(animes) {
        this.grid.innerHTML = '';
        
        if (!animes || animes.length === 0) {
            this.grid.innerHTML = `<p class="col-span-full text-center py-10">No se encontraron resultados 🕵️‍♂️</p>`;
            return;
        }

        animes.forEach(anime => {
            const esFav = this.estado.favoritos.includes(anime.mal_id);
            const card = document.createElement('div');
            card.className = "anime-card bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg p-3 relative";
            
            card.innerHTML = `
                <div class="relative h-60 overflow-hidden rounded-xl mb-3">
                    <img src="${anime.images.jpg.large_image_url}" class="w-full h-full object-cover">
                    <button onclick="ZenithApp.toggleFavorito(${anime.mal_id})" 
                        class="absolute top-2 right-2 p-2 rounded-full ${esFav ? 'bg-yellow-500' : 'bg-black/50'} backdrop-blur-md transition-colors">
                        ⭐
                    </button>
                </div>
                <h3 class="font-bold text-sm truncate text-white">${anime.title}</h3>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-[10px] font-black text-blue-400 uppercase tracking-widest">⭐ ${anime.score || 'N/A'}</span>
                    <a href="${anime.url}" target="_blank" class="text-[10px] bg-slate-800 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-600 transition-all">DETALLES</a>
                </div>
            `;
            this.grid.appendChild(card);
        });
    },

    // --- Utilidades ---
    mostrarCarga(estado) {
        if (estado) {
            this.grid.innerHTML = `<div class="col-span-full text-center py-20 animate-pulse text-blue-500 font-bold">SINCRONIZANDO... ⚙️</div>`;
        }
    },

    mostrarError() {
        this.grid.innerHTML = `
            <div class="col-span-full text-center py-20 text-red-400">
                <p>⚠️ Error de conexión con la API.</p>
                <button onclick="ZenithApp.cargarAnimes()" class="mt-4 bg-slate-800 px-4 py-2 rounded-lg">Reintentar</button>
            </div>`;
    },

    toggleFavorito(id) {
        if (this.estado.favoritos.includes(id)) {
            this.estado.favoritos = this.estado.favoritos.filter(favId => favId !== id);
        } else {
            this.estado.favoritos.push(id);
            this.mostrarToast();
        }
        localStorage.setItem('zenith_favs', JSON.stringify(this.estado.favoritos));
        this.cargarAnimes(); // Refrescar para actualizar iconos
    },

    mostrarToast() {
        this.notificacion.classList.replace('translate-y-24', 'translate-y-0');
        this.notificacion.classList.replace('opacity-0', 'opacity-100');
        setTimeout(() => {
            this.notificacion.classList.replace('translate-y-0', 'translate-y-24');
            this.notificacion.classList.replace('opacity-100', 'opacity-0');
        }, 2000);
    }
};

// Arrancar App
ZenithApp.init();
