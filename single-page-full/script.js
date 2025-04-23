
// STARTER SELECT LOGIC
let selectedStarter = null;
document.querySelectorAll(".poke-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedStarter = btn.getAttribute("data-pokemon");
    document.getElementById("pokemonImg").src = `https://play.pokemonshowdown.com/sprites/ani/${selectedStarter}.gif`;
    document.getElementById("pokemonImg").style.display = "block";
  });
});

// SWITCH TO DECK SCREEN
document.getElementById('startGameBtn').addEventListener('click', () => {
  if (!selectedStarter) {
    alert("Please select a Pokémon!");
    return;
  }
  document.getElementById('starter-screen').style.display = 'none';
  document.getElementById('deck-screen').style.display = 'block';
});

// SWITCH TO BATTLE SCREEN
document.getElementById('startBattleBtn').addEventListener('click', () => {
  document.getElementById('deck-screen').style.display = 'none';
  document.getElementById('battle-screen').style.display = 'block';
});

// You can paste your battle and deck logic below here if needed
