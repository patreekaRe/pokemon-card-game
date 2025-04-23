
let selectedStarter = null;

document.querySelectorAll('.poke-btn').forEach(button => {
  button.addEventListener('click', () => {
    const chosen = button.dataset.pokemon;
    selectedStarter = chosen;
    localStorage.setItem('starter', chosen);

    const img = document.getElementById('pokemonImg');
    img.src = getPokemonGif(chosen);
    img.style.display = 'block';
  });
});

document.getElementById('startGameBtn').addEventListener('click', () => {
  if (!selectedStarter) {
    alert("Please select a Pokémon!");
    return;
  }

  // Adjust path depending on structure
  window.location.href = 'Deck-builder.html';
});

function getPokemonGif(name) {
  const gifs = {
    charmander: 'https://media.tenor.com/hLfJG3B_ZLIAAAAj/charmander-gif-pokemon.gif',
    bulbasaur: 'https://user-images.githubusercontent.com/37589213/52086676-d41dce00-25a7-11e9-89fe-51a2aef284a9.gif',
    squirtle: 'https://static.wikia.nocookie.net/pokeone/images/2/27/007Squirtle.gif',
    cyndaquil: 'https://media.tenor.com/Q1GffEXQrgAAAAAj/cyndaquil-pokemon.gif',
    chikorita: 'https://64.media.tumblr.com/44f3f022e4b3a68709556f9f0d6fa92e/tumblr_noxx7oyhRP1scncwdo1_540.gif',
    totodile: 'https://media.tenor.com/lr6evdW49pcAAAAj/totodile-pokemon.gif',
    torchic: 'https://media.tenor.com/fPy5h_wW5IQAAAAj/torchic-pokemon.gif',
    treecko: 'https://img.pokemondb.net/sprites/black-white/anim/normal/treecko.gif',
    mudkip: 'https://media.tenor.com/cQtoIIrpSxQAAAAj/pokemon-mudkip.gif'
  };
  return gifs[name] || '';
}

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


    // Navigation logic
    document.getElementById('startGameBtn').addEventListener('click', () => {
      if (!selectedStarter) {
        alert("Please select a Pokémon!");
        return;
      }
      document.getElementById('starter-screen').style.display = 'none';
      document.getElementById('deck-screen').style.display = 'block';
    });

    document.getElementById('startBattleBtn').addEventListener('click', () => {
      document.getElementById('deck-screen').style.display = 'none';
      document.getElementById('battle-screen').style.display = 'block';
    });
    