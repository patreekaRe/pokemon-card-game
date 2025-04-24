
// Placeholder Evolve and Remove button handlers
document.querySelector(".evolve-btn").addEventListener("click", () => {
  alert("Evolve logic will go here.");
});

document.querySelector(".remove-btn").addEventListener("click", () => {
  alert("Remove logic will go here.");
});

// Prevent redirect and show deck builder in-page
document.getElementById('startGameBtn').addEventListener('click', () => {
  if (!localStorage.getItem('starter')) {
    alert("Please select a Pokémon!");
    return;
  }
  document.getElementById('starter-screen').style.display = 'none';
  document.getElementById('deck-screen').style.display = 'block';
});
