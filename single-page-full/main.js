
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
  charmander: "#ff4444",
  bulbasaur: "#66cc66",
  squirtle: "#66b3ff",
  cyndaquil: "#ff9966",
  chikorita: "#aaff99",
  totodile: "#66ccff",
  torchic: "#ff9966",
  treecko: "#99ffcc",
  mudkip: "#99e6ff"
};

pokeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pokemon = button.getAttribute("data-pokemon");
    selectedStarter = pokemon;
    localStorage.setItem("starter", pokemon);

    // Update preview GIF
    pokemonImg.src = spriteMap[pokemon] || "";
    pokemonImg.style.display = "block";

    // Update trainer background and full page background color
    const color = colorMap[pokemon] || "#ffffff";
    trainerBackground.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
  });
});
