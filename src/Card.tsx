import * as React from 'react'

type FOCUS_TYPE = 'number' | 'cvc' | 'expiration'

interface ReactCreditCardProps {
  number: string
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
            <div className={displayClassName('number')}>{props.number}</div>
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

//TODO: Add formatNumber function

export default ReactCreditCard
