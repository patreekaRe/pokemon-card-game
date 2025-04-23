
document.addEventListener("DOMContentLoaded", () => {
  let playerHP = 30;
  let playerEnergy = 3;
  let playerXP = 0;
  let blockAmount = 0;
  let enemyHP = 25;
  let enemyIntent = "Attack (5)";
  const maxHandSize = 5;

  const playerHPSpan = document.getElementById("player-hp");
  const playerEnergySpan = document.getElementById("player-energy");
  const playerXPSpan = document.getElementById("player-xp");
  const playerBlockSpan = document.getElementById("player-block");
  const enemyHPSpan = document.getElementById("enemy-hp");
  const enemyIntentSpan = document.getElementById("enemy-intent");
  const battleLog = document.getElementById("battle-log");
  const handContainer = document.getElementById("player-hand");
  const endTurnBtn = document.getElementById("end-turn-btn");

  let deck = [
    "Ember", "Ember", "Ember",
    "Block", "Block",
    "Tailwind", "Tailwind"
  ];

  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function drawHand() {
    clearHand();
    shuffleDeck(); // Shuffle before every draw for simplicity
    const hand = deck.slice(0, maxHandSize);
    hand.forEach(cardName => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = cardName;
      card.addEventListener("click", () => playCard(cardName));
      handContainer.appendChild(card);
    });
  }

  function drawCard() {
    if (deck.length > 0) {
      const cardName = deck[Math.floor(Math.random() * deck.length)];
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = cardName;
      card.addEventListener("click", () => playCard(cardName));
      handContainer.appendChild(card);
    }
  }

  function clearHand() {
    handContainer.innerHTML = "";
  }

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
    playerBlockSpan.textContent = blockAmount;
    enemyHPSpan.textContent = enemyHP;
    enemyIntentSpan.textContent = enemyIntent;
  }

  function playCard(cardName) {
    if (playerEnergy <= 0) {
      log("Not enough energy!");
      return;
    }

    switch (cardName) {
      case "Ember":
        enemyHP -= 5;
        playerEnergy -= 1;
        playerXP += 2;
        log("You used Ember! Enemy takes 5 damage.");
        break;
      case "Block":
        playerEnergy -= 1;
        blockAmount += 6;
        log("You used Block! Gained 6 block.");
        break;
      case "Tailwind":
        playerEnergy -= 1;
        playerXP += 2;
        drawCard();
        log("You used Tailwind! Gained 2 XP and drew 1 card.");
        break;
      default:
        log("Card effect not defined.");
    }

    updateStats();
    checkWin();
  }

  function checkWin() {
    if (enemyHP <= 0) {
      enemyHP = 0;
      log("You defeated Ashroot!");
      enemyIntent = "Defeated";
      updateStats();
      clearHand();
    }
  }

  endTurnBtn.addEventListener("click", () => {
    if (enemyHP > 0) {
      log("Ashroot attacks for 5!");
      if (blockAmount >= 5) {
        blockAmount -= 5;
        log("Block absorbed the damage!");
      } else {
        const damageLeft = 5 - blockAmount;
        playerHP -= damageLeft;
        blockAmount = 0;
        log("Block absorbed part of the damage. You took " + damageLeft + " damage.");
      }
      playerEnergy = 3;
      blockAmount = 0;
      drawHand();
      updateStats();
    }

    if (playerHP <= 0) {
      playerHP = 0;
      log("You fainted! Game over.");
      endTurnBtn.disabled = true;
      clearHand();
    }
  });

  // Initial setup
  updateStats();
  drawHand();
  log("Battle begins! Ashroot is preparing to strike...");
});
