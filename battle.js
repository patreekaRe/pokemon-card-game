
document.addEventListener("DOMContentLoaded", () => {
  let playerHP = 30;
  let playerEnergy = 3;
  let playerXP = 0;
  let enemyHP = 25;
  let enemyIntent = "Attack (5)";

  const playerHPSpan = document.getElementById("player-hp");
  const playerEnergySpan = document.getElementById("player-energy");
  const playerXPSpan = document.getElementById("player-xp");
  const enemyHPSpan = document.getElementById("enemy-hp");
  const enemyIntentSpan = document.getElementById("enemy-intent");
  const battleLog = document.getElementById("battle-log");
  const cards = document.querySelectorAll(".card");
  const endTurnBtn = document.getElementById("end-turn-btn");

  function log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    battleLog.appendChild(p);
    battleLog.scrollTop = battleLog.scrollHeight;
  }

  function updateStats() {
    playerHPSpan.textContent = playerHP;
    playerEnergySpan.textContent = playerEnergy;
    playerXPSpan.textContent = playerXP;
    enemyHPSpan.textContent = enemyHP;
    enemyIntentSpan.textContent = enemyIntent;
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (playerEnergy <= 0) {
        log("Not enough energy!");
        return;
      }

      switch (card.textContent) {
        case "Ember":
          enemyHP -= 5;
          playerEnergy -= 1;
          playerXP += 2;
          log("You used Ember! Enemy takes 5 damage.");
          break;
        case "Block":
          // We'll simulate block with XP gain for now
          playerEnergy -= 1;
          playerXP += 1;
          log("You used Block! (future: add shield mechanic)");
          break;
        case "Tailwind":
          playerEnergy -= 1;
          playerXP += 3;
          log("You used Tailwind! You feel energized!");
          break;
        default:
          log("Card effect not defined.");
      }

      updateStats();
      checkWin();
    });
  });

  function checkWin() {
    if (enemyHP <= 0) {
      enemyHP = 0;
      log("You defeated Ashroot!");
      enemyIntent = "Defeated";
      updateStats();
    }
  }

  endTurnBtn.addEventListener("click", () => {
    if (enemyHP > 0) {
      log("Ashroot attacks for 5!");
      playerHP -= 5;
      playerEnergy = 3; // refresh energy
      updateStats();
    }

    if (playerHP <= 0) {
      playerHP = 0;
      log("You fainted! Game over.");
      endTurnBtn.disabled = true;
    }
  });

  updateStats();
  log("Battle begins! Ashroot is preparing to strike...");
});
