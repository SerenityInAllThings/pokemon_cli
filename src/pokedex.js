
// pokemon types: fire, plant, water
const createPokemon = (name, hp, dmg, def, speed, type) => {
  return {
    name,
    totalHitpoints: hp,
    hitpoints: hp,
    damage: dmg,
    spd: speed,
    defense: def,
    type,
    isDead: function () {
      return this.hitpoints <= 0
    },
    takeDamage: function(dmg, attacker) {
      const totalDmg = dmg - this.defense / 2 < 0 
        ? 0 
        : dmg - this.defense / 2
      console.log(this.name + ' took ' + totalDmg + ' from ' + attacker)
      this.hitpoints -= totalDmg
      console.log(this.name + ' now has ' + this.hitpoints + ' hp')
    },
    sleep: function() {
      const healPercentage = 15
      const heal = Math.ceil((this.totalHitpoints / 100) * healPercentage)
      console.log(this.name + ' sleeps and heals for ' + heal + ' hp.')
      this.hitpoints += heal
      if (this.totalHitpoints < this.hitpoints) {
        this.hitpoints = this.totalHitpoints
      }
      console.log(this.name + ' now has ' + this.hitpoints + ' hp')
    },
    //** This is to simulate another player deciding to attack or sleep */
    fightOrFlight: function () {
      // The lower the hp the higher the chance for it to sleep
      // Should not get so close to 100% chance when low hp
      const hpPercentage = this.hitpoints * 100 / this.totalHitpoints
      const loweringFactor = 0.8
      const fightChange = hpPercentage * loweringFactor
      const random = Math.ceil(Math.random() * 100)
      const fight = random < fightChange
      if (fight) return 'fight'
      return 'flight'
    },
    stringify: function () { 
      return this.name  + 
      ' hp: ' + this.hitpoints + 
      ' dmg: ' + this.damage +
      ' def: ' + this.defense +
      ' spd: ' + this.spd +
      ' typ: ' + this.type
    },
    drawHp: function () {
      let representation = "["
      for(let i=0;i<=this.hitpoints; i += 5)
        representation += '|'
      for (let i=this.hitpoints; i<this.totalHitpoints; i+= 5)
        representation += ' '
      representation += ']'
      return representation
    }
  } 
}

const createCharmander = () => {
  return createPokemon('charmander', 39, 52, 43, 5, 'fire')
}

const createBulbasaur = () => {
  return createPokemon('bulbasaur', 45, 49, 49, 7, 'plant')
}

const createSquirtle = () => {
  return createPokemon('squirtle', 44, 48, 65, 2, 'water')
}

const createChikorita = () => {
  return createPokemon('chikorita', 45, 49, 65, 6, 'plant')
}

const createCyndaquil = () => {
  return createPokemon('cyndaquil', 39, 52, 43, 3, 'fire')
}

const createTotodile = () => {
  return createPokemon('totodile', 50, 65, 64, 10, 'water')
}

module.exports.createCharmander = createCharmander
module.exports.createBulbasaur = createBulbasaur
module.exports.createSquirtle = createSquirtle
module.exports.createChikorita = createChikorita
module.exports.createCyndaquil = createCyndaquil
module.exports.createTotodile = createTotodile
