
// BACKGROUND SWITCHING + STARTER LOGIC
const trainerBackground = document.getElementById("trainerBackground");
const pokeButtons = document.querySelectorAll(".poke-btn");
let selectedStarter = null;

pokeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const pokemon = button.getAttribute("data-pokemon");
    selectedStarter = pokemon;
    localStorage.setItem("starter", pokemon);

    // Update preview sprite
    const img = document.getElementById("pokemonImg");
    img.src = `https://play.pokemonshowdown.com/sprites/ani/${pokemon}.gif`;
    img.style.display = "block";

    // Update background color based on type
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

    trainerBackground.style.backgroundColor = colorMap[pokemon] || "#fff";
  });
});
