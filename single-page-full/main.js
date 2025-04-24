
// BACKGROUND COLOR + GIF PREVIEW LOGIC
const trainerBackground = document.getElementById("trainerBackground");
const pokeButtons = document.querySelectorAll(".poke-btn");
const pokemonImg = document.getElementById("pokemonImg");

let selectedStarter = null;

const spriteMap = {
  charmander: "https://play.pokemonshowdown.com/sprites/ani/charmander.gif",
  bulbasaur: "https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif",
  squirtle: "https://play.pokemonshowdown.com/sprites/ani/squirtle.gif",
  cyndaquil: "https://play.pokemonshowdown.com/sprites/ani/cyndaquil.gif",
  chikorita: "https://play.pokemonshowdown.com/sprites/ani/chikorita.gif",
  totodile: "https://play.pokemonshowdown.com/sprites/ani/totodile.gif",
  torchic: "https://play.pokemonshowdown.com/sprites/ani/torchic.gif",
  treecko: "https://play.pokemonshowdown.com/sprites/ani/treecko.gif",
  mudkip: "https://play.pokemonshowdown.com/sprites/ani/mudkip.gif"
};

const colorMap = {
  charmander: "#ffcccc",
  bulbasaur: "#ccffcc",
  squirtle: "#cce5ff",
  cyndaquil: "#ffe6cc",
  chikorita: "#e0ffd4",
  totodile: "#cce6ff",
  torchic: "#ffddcc",
  treecko: "#ccffe0",
  mudkip: "#ccf2ff"
};

pokeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pokemon = button.getAttribute("data-pokemon");
    selectedStarter = pokemon;
    localStorage.setItem("starter", pokemon);

    // Change preview GIF
    pokemonImg.src = spriteMap[pokemon] || "";
    pokemonImg.style.display = "block";

    // Change background color
    trainerBackground.style.backgroundColor = colorMap[pokemon] || "#ffffff";
  });
});
