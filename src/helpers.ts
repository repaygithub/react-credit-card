import { cardFromNumber, cardFromType, CardInfo } from './cardValidation'

function getCardInfo(number: string, type?: string): CardInfo {
  let cardInfo = type ? cardFromType(type) : cardFromNumber(number || '')
  return cardInfo
}

function formatNumber(number: string, cardInfo: CardInfo): string {
  let string = !number ? '' : number
  const minLength = cardInfo.minLength
  const maxLength = cardInfo.maxLength

  if (string.length > maxLength) {
    string = string.slice(0, maxLength)
  }

  while (string.length < minLength) {
    string += '•'
  }

  if (cardInfo.brand === 'amex') {
    const spaceIndex1 = 4
    const spaceIndex2 = 10

    string =
      string.substring(0, spaceIndex1) +
      ' ' +
      string.substring(spaceIndex1, spaceIndex2) +
      ' ' +
      string.substring(spaceIndex2)
  } else {
    const numOfSpaces = Math.floor(string.length / 4)
    let i = 1

    for (i; i <= numOfSpaces; i++) {
      const spaceIndex = i * 4 + (i - 1)
      string = string.slice(0, spaceIndex) + ' ' + string.slice(spaceIndex)
    }
  }

  return string
}

function formatExpiration(expiration?: string): string {
  if (!expiration) {
    return '••/••'
  } else {
    expiration = expiration.toString().replace(/\D/g, '')
    let expirationMaxLength = 6

    if (expiration === '') {
      return '••/••'
    }

    while (expiration.length < 4) {
      expiration += '•'
    }

    return expiration.slice(0, 2) + '/' + expiration.slice(2, expirationMaxLength)
  }
}

export { formatExpiration, formatNumber, getCardInfo }
