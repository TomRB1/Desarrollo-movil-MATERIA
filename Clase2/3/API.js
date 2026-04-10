// URL base de la API (arranca con una búsqueda vacía)
let URL = "https://api.jikan.moe/v4/anime?q"

// agarramos el input del HTML
const input = document.getElementById("inputAnime")

// evento que se ejecuta cada vez que el usuario escribe
input.addEventListener("input", () => {
    const texto = input.value

    // si tiene menos de 3 letras, no busca nada
    if (texto.length < 3) return

    // actualizamos la URL con lo que escribió el usuario
    URL = `https://api.jikan.moe/v4/anime?q=${texto}`

    // llamamos a la función que consulta la API
    consulta()
})

// función async que hace la petición a la API
const consulta = async () =>{
    try {
        // fetch a la API
        const response = await fetch(URL)

        // convertimos la respuesta a JSON
        const datos = await response.json()

        // eliminamos resultados anteriores (articles)
        document.querySelectorAll("article").forEach(e => e.remove())

        // mostramos los nuevos datos
        mostrar(datos)

    } catch (error) {
        // si algo falla, lo mostramos en consola
        console.error(error)
    }
}

// se ejecuta una vez al cargar la página
consulta()

// función que muestra los datos en el HTML
const mostrar = (data) => {
    // accedemos al array de animes
    const anime = data.data

    // recorremos cada anime
    for (let animeDatos of anime) {
        console.log(animeDatos)

        // creamos un elemento <article>
        const articuloAnime = document.createElement("article")

        // insertamos el título del anime
        articuloAnime.innerHTML = `<h1>${animeDatos.title}</h1>`

        // lo agregamos al body
        document.body.appendChild(articuloAnime)
    }
}