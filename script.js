// Tu base de datos centralizada 📋
const catalogo = [
    {
        titulo: "Sousou no Frieren",
        img: "https://ejemplo.com/frieren.jpg",
        video: "https://reproductor.com/frieren",
        generos: ["Aventura", "Fantasía"]
    },
    {
        titulo: "Tensura",
        img: "https://ejemplo.com/tensura.jpg",
        video: "https://reproductor.com/tensura",
        generos: ["Isekai", "Acción"]
    }
];

// Función para "dibujar" el catálogo en pantalla 🎨
function renderizar(lista) {
    const grid = document.getElementById('contenedor-animes');
    grid.innerHTML = ''; // Limpiar antes de mostrar

    lista.forEach(anime => {
        const tarjeta = `
            <div class="card border border-gray-800 rounded-xl overflow-hidden transition-all bg-gray-900 shadow-lg cursor-pointer" onclick="reproducir('${anime.video}')">
                <img src="${anime.img}" class="w-full h-64 object-cover">
                <div class="p-3">
                    <h3 class="font-bold text-sm truncate">${anime.titulo}</h3>
                    <p class="text-xs text-gray-500">${anime.generos.join(', ')}</p>
                </div>
            </div>
        `;
        grid.innerHTML += tarjeta;
    });
}

// Iniciar catálogo
renderizar(catalogo);
