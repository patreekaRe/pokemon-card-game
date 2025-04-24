
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
