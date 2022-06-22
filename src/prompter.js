const prompt = require('prompt-sync')()

const selectFromOptions = (question, options) => {
  const isValidOption = (value) => options
      .map(option => option.value)
      .includes(value)
  const text = question + '\n\n' + options
    .map(option => option.value + ') ' + option.text)
    .join('\n') + '\n'
  const validOptions = options
    .map(option => option.value)
    .join(', ')
  let answer
  do {
    if (answer != null) console.log('Invalid option. Try one of the following:', validOptions)
    answer = prompt(text)
  } while(!isValidOption(answer))
  return answer
}

const clear = () => console.clear()

const awaitKeyStroke = () => {
  console.log('Enter to continue...')
  prompt('')
}

module.exports.selectFromOptions = selectFromOptions
module.exports.clear = clear
module.exports.awaitKeyStroke = awaitKeyStroke