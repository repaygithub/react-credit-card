import * as React from 'react'
import cardType from './cardValidation'

type FOCUS_TYPE = 'number' | 'cvc' | 'expiration' | 'name'

interface ReactCreditCardProps {
  number?: string
  name?: string
  placeholderName?: string
  type?: string
  focused?: FOCUS_TYPE
  useRadialGradient?: boolean
}

const classnames = (...args) =>
  args
    .reduce((memo, arg) => {
      if (typeof arg === 'string') {
        memo += ' ' + arg
      }
      return memo
    }, '')
    .trim()

const ReactCreditCard: React.FC<ReactCreditCardProps> = props => {
  let cardInfo = getCardInfo(props.number, props.type)
  let isFlipped = props.focused === 'cvc' && cardInfo.brand !== 'amex'
  const topClassName = classnames(
    'ReactCreditCard',
    isFlipped && 'ReactCreditCard--flipped',
    `ReactCreditCard--${cardInfo.brand}`,
    cardInfo.brand !== 'unknown' && 'ReactCreditCard--identified',
    props.useRadialGradient && 'ReactCreditCard--radial'
  )
  return (
    <div className="ReactCreditCard__container">
      <div className={topClassName}>
        <div className="ReactCreditCard__front">
          <div className="ReactCreditCard__lower">
            <div className="ReactCreditCard__shiny" />
            <img className="ReactCreditCard__logo" src="" />
            <div className={displayClassName('number')}>{formatNumber(props.number, cardInfo)}</div>
            <div className={displayClassName('name')}>
              {!props.name ? props.placeholderName : props.name}
            </div>
          </div>
        </div>
        <div className="ReactCreditCard__back">
          <div className="ReactCreditCard__bar" />
        </div>
      </div>
    </div>
  )
}

ReactCreditCard.defaultProps = {
  placeholderName: 'FULL NAME',
}

function getCardInfo(number: string, type?: string): { maxLength: number; brand: string } {
  let defaultBrand = { maxLength: 16, brand: type || 'unknown' }

  if (!number) {
    return defaultBrand
  }

  let brand = type || cardType(number)

  if (brand) {
    if (brand === 'amex') {
      return { brand, maxLength: 15 }
    } else {
      return { brand, maxLength: 16 }
    }
  }

  return defaultBrand
}

function displayClassName(prop: FOCUS_TYPE, focused?: FOCUS_TYPE): string {
  let className = `ReactCreditCard__${prop} ReactCreditCard__display`

  if (focused === prop) {
    className += ' ReactCreditCard--focused'
  }

  return className
}

function formatNumber(number: string, cardInfo: { maxLength: number; brand: string }): string {
  let string = !number ? '' : number
  const maxLength = cardInfo.maxLength

  if (string.length < maxLength) {
    string = string.slice(0, maxLength)
  }

  while (string.length < maxLength) {
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
    const numOfSpaces = Math.ceil(maxLength / 4)
    let i = 1

    for (i; i <= numOfSpaces; i++) {
      const spaceIndex = i * 4 + (i - 1)
      string = string.slice(0, spaceIndex) + ' ' + string.slice(spaceIndex)
    }
  }

  return string
}

export default ReactCreditCard
