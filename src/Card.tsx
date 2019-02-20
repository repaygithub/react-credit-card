import * as React from 'react'

type FOCUS_TYPE = 'number' | 'cvc' | 'expiration' | 'name'

interface ReactCreditCardProps {
  number: string
  name: string
  placeholderName: string
  type?: string
  focused?: FOCUS_TYPE
}

const ReactCreditCard: React.FC<ReactCreditCardProps> = props => {
  let cardInfo = getCardInfo(props.number, props.type)
  let isFlipped = props.focused === 'cvc' && cardInfo.brand !== 'amex'
  return (
    <div className="ReactCreditCard__container">
      <div className={`ReactCreditCard ${isFlipped ? 'ReactCreditCard--flipped' : ''}`}>
        <div className="ReactCreditCard__front">
          <div className="ReactCreditCard__lower">
            <div className="ReactCreditCard__shiny" />
            <img className="ReactCreditCard__logo" src="" />
            <div className={displayClassName('number')}>{formatNumber(props.number, cardInfo)}</div>
            <div className ={displayClassName("name")}>{props.name === '' ? props.placeholderName : props.name}</div>
          </div>
        </div>
        <div className="ReactCreditCard__back">
          <div className="ReactCreditCard__bar" />
        </div>
      </div>
    </div>
  )
}

function getCardInfo(number: string, type?: string): { maxLength: number; brand: string } {
  return { maxLength: 16, brand: 'unknown' }
}

function displayClassName(prop: FOCUS_TYPE, focused?: FOCUS_TYPE): string {
  let className = `ReactCreditCard__${prop} ReactCreditCard__display`

  if (focused === prop) {
    className += ' ReactCreditCard--focused'
  }

  return className
}

function formatNumber(number: string, cardInfo: { maxLength: number, brand: string }): string {
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

    string = string.substring(0, spaceIndex1) + ' ' + string.substring(spaceIndex1, spaceIndex2) + ' ' + string.substring(spaceIndex2)
  } else {
    const numOfSpaces = Math.ceil(maxLength / 4)
    let i = 1
    for (i; i <= numOfSpaces; i++) {
      const spaceIndex = (i * 4 + (i - 1))
      string = string.slice(0, spaceIndex) + ' ' + string.slice(spaceIndex)
    }
  }

  return string
}

export default ReactCreditCard
