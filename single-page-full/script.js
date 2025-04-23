
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



document.addEventListener("DOMContentLoaded", () => {
  const battleLog = document.getElementById("battle-log");

  function log(message) {
    const p = document.createElement("p");
    p.textContent = message;
    battleLog.appendChild(p);
    battleLog.scrollTop = battleLog.scrollHeight;
  }

  const starter = localStorage.getItem("starter");

  let deck = [];

  if (starter === "charmander") {
    log("You sent out Charmander!");
    deck = ["Ember", "Ember", "Block", "Tailwind", "Ember+", "Flare Up"];
  } else if (starter === "bulbasaur") {
    log("You sent out Bulbasaur!");
    deck = ["Vine Whip", "Grow", "Leech Seed", "Block", "Recover", "Tailwind"];
  } else if (starter === "squirtle") {
    log("You sent out Squirtle!");
    deck = ["Water Gun", "Shell", "Block", "Bubble", "Tailwind", "Soak"];
  } else {
    log("No starter selected — defaulting to Charmander.");
    deck = ["Ember", "Block", "Tailwind"];
  }

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
  const handContainer = document.getElementById("player-hand");
  const endTurnBtn = document.getElementById("end-turn-btn");

  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function drawHand() {
    clearHand();
    shuffleDeck();
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
      case "Ember+":
        enemyHP -= 8;
        playerEnergy -= 1;
        playerXP += 3;
        log("You used Ember+! Enemy takes 8 damage.");
        break;
      case "Flare Up":
        enemyHP -= 10;
        playerEnergy -= 2;
        playerXP += 4;
        log("You used Flare Up! Massive fire damage!");
        break;
      case "Vine Whip":
        enemyHP -= 4;
        playerEnergy -= 1;
        playerXP += 2;
        log("You used Vine Whip! Grass lashes out.");
        break;
      case "Grow":
        playerEnergy += 1;
        playerXP += 1;
        log("You used Grow! Gained 1 extra energy.");
        break;
      case "Leech Seed":
        enemyHP -= 3;
        playerHP += 3;
        playerEnergy -= 1;
        log("You used Leech Seed! Drained HP from enemy.");
        break;
      case "Recover":
        playerHP += 6;
        playerEnergy -= 1;
        log("You used Recover! Healed 6 HP.");
        break;
      case "Water Gun":
        enemyHP -= 4;
        playerEnergy -= 1;
        playerXP += 2;
        log("You used Water Gun! A splash of damage.");
        break;
      case "Shell":
        blockAmount += 8;
        playerEnergy -= 1;
        log("You used Shell! Gained 8 block.");
        break;
      case "Bubble":
        enemyHP -= 2;
        blockAmount += 2;
        playerEnergy -= 1;
        log("You used Bubble! Small damage and block.");
        break;
      case "Soak":
        playerXP += 1;
        blockAmount += 4;
        playerEnergy -= 1;
        log("You used Soak! Gained block and XP.");
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

  updateStats();
  drawHand();
  log("Battle begins! Ashroot is preparing to strike...");
});
