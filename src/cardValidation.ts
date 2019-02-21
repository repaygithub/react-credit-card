const defaultFormat = /(\d{1,4})/g

export interface CardInfo {
  brand: string
  pattern: RegExp
  format: RegExp
  minLength: number
  maxLength: number
  cvcLength: number
}

const cards: CardInfo[] = [
  {
    brand: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    minLength: 15,
    maxLength: 15,
    cvcLength: 4,
  },
  {
    brand: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    minLength: 16,
    maxLength: 19,
    cvcLength: 3,
  },
  {
    brand: 'mastercard',
    pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    format: defaultFormat,
    minLength: 16,
    maxLength: 16,
    cvcLength: 3,
  },
  {
    brand: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    minLength: 16,
    maxLength: 19,
    cvcLength: 3,
  },
]

const unknownCardInfo: CardInfo = Object.freeze({
  brand: 'unknown',
  pattern: /^[0-9]/,
  format: defaultFormat,
  minLength: 16,
  maxLength: 19,
  cvcLength: 3,
})

export function cardFromType(brand: string): CardInfo {
  let card = cards.find(card => {
    return brand === card.brand
  })
  return card || unknownCardInfo
}

export function cardFromNumber(number: string): CardInfo {
  number = number.replace(/\D/g, '')
  let card = cards.find(card => {
    return card.pattern.test(number)
  })
  return card || unknownCardInfo
}

export default function cardType(number: string): CardInfo | null {
  if (!number) {
    return null
  }
  let cardObj = cardFromNumber(number)
  return cardObj ? cardObj : null
}
