// 1. TU LISTA DE ANIMES (Edita esto para agregar más) 📋
const misAnimes = [
    {
        titulo: "Jojo's Bizarre Adventure",
        imagen: "https://cdn.myanimelist.net/images/anime/3/40327.jpg",
        linkVideo: "https://www.fembed.com/v/ejemplo1" // Tu link directo
    },
    {
        titulo: "One Piece",
        imagen: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
        linkVideo: "https://mega.nz/embed/ejemplo2" // Tu link directo
    }
];

const grid = document.getElementById('lista-animes');
const visor = document.getElementById('contenedor-video');
const iframe = document.getElementById('reproductor');
const txtTitulo = document.getElementById('titulo-actual');

// 2. Función para mostrar los animes en la pantalla
function renderizar() {
    grid.innerHTML = '';
    misAnimes.forEach(anime => {
        const card = document.createElement('div');
        card.className = "anime-card cursor-pointer group";
        card.innerHTML = `
            <div class="relative overflow-hidden rounded-lg aspect-[3/4]">
                <img src="${anime.imagen}" class="w-full h-full object-cover transition-transform duration-300">
                <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <h4 class="mt-2 font-bold text-sm truncate">${anime.titulo}</h4>
        `;
        card.onclick = () => verAnime(anime);
        grid.appendChild(card);
    });
}

// 3. Función para activar el video
function verAnime(anime) {
    visor.classList.remove('hidden');
    iframe.src = anime.linkVideo;
    txtTitulo.innerText = anime.titulo;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

renderizar();
