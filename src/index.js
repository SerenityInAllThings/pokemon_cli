const { createCharmander, createBulbasaur, createSquirtle, createChikorita, createTotodile, createCyndaquil } = require('./pokedex')
const { selectFromOptions, clear, awaitKeyStroke } = require('./prompter')
const { battle } = require('./battleground')

const selectBasePokemon = () => {
  const charmander = createCharmander()
  const bulbasaur = createBulbasaur()
  const squirtle = createSquirtle()
  const options = [charmander, bulbasaur, squirtle]
  const textOptions = options.map(pokemon => {
    return {
      value: pokemon.name.slice(0, 1),
      text: pokemon.stringify()
    }
  })
  clear()
  const selected = selectFromOptions('Select your Pokemon!!', textOptions)
  const pokemon = options.find(pokemon => pokemon.name.startsWith(selected))
  console.log(pokemon.name + ' loves you <3')
  awaitKeyStroke()
  return pokemon
}

const runTournament = () => {
  const player = selectBasePokemon()

  const tournamentOponents = [createChikorita(), createTotodile(), createCyndaquil()]
  for(const oponent of tournamentOponents) {
    battle(player, oponent)
  }
}
runTournament()