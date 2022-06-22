const { clear, awaitKeyStroke, selectFromOptions } = require('./prompter')

const battle = (player, oponent) => {
  const playerWon = () => oponent.isDead() && !player.isDead()
  const oponentWon = () => !oponent.isDead() && player.isDead()
  const noOneIsDead = () => !oponent.isDead() && !player.isDead()

  const firstAttacker = player.spd > oponent.spd
    ? player
    : oponent

  const playerTurn = () => {
    const options = [{
      value: 'a',
      text: 'Attack! Will attack the enemy opponent'
    }, {
      value: 's',
      text: 'Sleep. Heals for 15%'
    }]
    const selected = selectFromOptions('Select your action:', options)

    switch(selected) {
      case 'a':
        console.log(player.name + ' attacks!!')
        oponent.takeDamage(player.damage, player.name)
        break;
      case 's':
        console.log(player.name + ' sleeps!!')
        player.sleep()
        break;
      default:
        console.log('not sure')
    }
  }

  const oponentTurn = () => {
    const oponentOption = oponent.fightOrFlight()
    if (oponentOption === 'fight') {
      console.log(oponent.name + ' attacks!!')
      player.takeDamage(oponent.damage, oponent.name)
    } else if (oponentOption === 'flight') {
      console.log(oponent.name + ' sleeps!!')
      oponent.sleep()
    } else {
      console.log('not sure 2')
    }
  }

  let turn = 1
  do {
    clear()
    console.log('Turn number', turn)
    drawBattle(player, oponent)
    if (firstAttacker === player) {
      console.log('The player will play first because it has higher speed')
      if (!player.isDead()) playerTurn()
      else break
      if (!oponent.isDead()) oponentTurn()
      else break
    } else {
      console.log('The oponent will play first because it has higher speed')
      if (!oponent.isDead()) oponentTurn()
      else break
      if (!player.isDead()) playerTurn()
      else break
    }
    awaitKeyStroke()
  } while(noOneIsDead())

  if (playerWon())
    console.log('Congratulations defeating ' + oponent.name + '!!')
  else if (oponentWon)
    console.log('Unfortunately you lost to ' + oponent.name + ' :c')
  else
    console.log('Draws count as loses :c')
  awaitKeyStroke()
  return playerWon()
}

const drawBattle = (player, oponent) => {
  clear()
  const playerText = player.stringify()
  const oponentText = oponent.stringify()
    
  console.log('PLAYER:\n' + playerText)
  console.log(player.drawHp())
  console.log('OPONENT:\n' + oponentText)
  console.log(oponent.drawHp())
}

module.exports.battle = battle