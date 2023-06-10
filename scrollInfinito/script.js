const personajesContainer = document.getElementById("charactersContainer");

let paginaActual = 1;

async function obtenerPersonajes() {
  const url = `https://rickandmortyapi.com/api/character?page=${paginaActual}`;
  const response = await fetch(url);
  const data = await response.json();

  data.results.forEach((personaje) => {
    const personajeElement = document.createElement("div");
    personajeElement.classList.add("card", "container");

    personajeElement.innerHTML = `

    <div class="atropos my-atropos">
    <div class="atropos-scale">
      <div class="atropos-rotate">
        <div class="atropos-inner">
        <h3 class="card__name">${personaje.name}</h3>
        <img class="card__img" src="${personaje.image}" alt="${personaje.name}">
          <p class="card__data">Estado: ${personaje.status}</p>
          <p class="card__data">Especie: ${personaje.species}</p>
          <p class="card__data">Género: ${personaje.gender}</p>
        </div>
      </div>
    </div>
  </div>
    `;

    personajesContainer.appendChild(personajeElement);
  });

  paginaActual++;
}

function llegoAlFinal() {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  return scrollTop + clientHeight >= scrollHeight;
}

window.addEventListener("scroll", async () => {
  if (llegoAlFinal()) {
    await obtenerPersonajes();
  }
});

obtenerPersonajes();
