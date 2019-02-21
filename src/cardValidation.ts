const defaultFormat = /(\d{1,4})/g

const cards = [
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [4],
    luhn: true,
  },
  {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'mastercard',
    pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16, 19],
    cvcLength: [3],
    luhn: true,
  },
]

function cardFromNumber(
  number: string
): {
  type: string
  pattern: RegExp
  format: RegExp
  length: number[]
  cvcLength: number[]
  luhn: boolean
} {
  number = number.replace(/\D/g, '')
  let card = cards.find(card => {
    return card.pattern.test(number)
  })
  return card
}

export default function cardType(number: string): string {
  if (!number) {
    return null
  }
  let cardObj = cardFromNumber(number)
  return cardObj ? cardObj.type : null
}
