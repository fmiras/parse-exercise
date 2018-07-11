function parse(string) {
  let endStringIndex
  if (string.startsWith('"')) {
    endStringIndex = string.substring(1).indexOf('"') + 1
  }

  if (string.startsWith("'")) {
    endStringIndex = string.substring(1).indexOf("'") + 1
  }

  if (endStringIndex && endStringIndex !== -1) {
    return {
      value: string.substring(1, endStringIndex),
      tail: string.substring(endStringIndex + 1)
    }
  }

  if (string.startsWith('false')) {
    return { value: false, tail: string.substring(5) }
  }

  if (string.startsWith('null')) {
    return { value: null, tail: string.substring(4) }
  }

  if (string.startsWith('true')) {
    return { value: true, tail: string.substring(4) }
  }

  const regexResult = /^\d+(?:\.\d+)?/.exec(string)
  if (regexResult) {
    return {
      value: parseFloat(regexResult[0]),
      tail: string.substring(regexResult[0].length)
    }
  }

  if (string[0] === '[') {
    const acumulator = []
    let input = string.substr(1)
    while (true) {
      if (input[0] === ']') {
        input = input.substring(1)
        break
      }

      if (input[0] === ',') {
        input = input.substring(1)
      }

      const { value, tail } = parse(input)
      acumulator.push(value)
      input = tail
    }
    return { value: acumulator, tail: input }
  }

  throw new TypeError(`Unexpected input, couldn't parse at ${string}`)
}

module.exports = parse
