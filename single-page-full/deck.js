document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("charmander-card");
  const sprite = card.querySelector(".poke-img");
  const name = card.querySelector(".poke-name");
  const stats = card.querySelector(".poke-stats");
  const evolveBtn = card.querySelector(".evolve-btn");
  const removeBtn = card.querySelector(".remove-btn");

  evolveBtn.addEventListener("click", () => {
    if (name.textContent === "Charmander") {
      sprite.src = "https://media.tenor.com/fk9-MPwwo60AAAAj/pok%C3%A9mon-charmeleongif.gif";
      name.textContent = "Charmeleon";
      stats.textContent = "HP: 58 | XP: 20 | Lv: 16";
      evolveBtn.textContent = "Final Evolve";
    } else if (name.textContent === "Charmeleon") {
      sprite.src = "https://media0.giphy.com/media/SnctJfY81x2XC/giphy.gif";
      name.textContent = "Charizard";
      stats.textContent = "HP: 78 | XP: 50 | Lv: 36";
      evolveBtn.textContent = "Max";
      evolveBtn.disabled = true;
    }
  });

  removeBtn.addEventListener("click", () => {
    card.remove();
  });
});