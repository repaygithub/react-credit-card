import * as React from 'react'
import { formatExpiration, formatNumber, getCardInfo } from './helpers'

type FOCUS_TYPE = 'number' | 'cvc' | 'expiration' | 'name'

interface ReactCreditCardProps {
  number?: string
  name?: string
  expiration?: string
  expirationBefore?: string
  expirationAfter?: string
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
            <div
              className={displayClassName('expiration')}
              data-before={props.expirationBefore}
              data-after={props.expirationAfter}
            >
              {formatExpiration(props.expiration)}
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

function displayClassName(prop: FOCUS_TYPE, focused?: FOCUS_TYPE): string {
  let className = `ReactCreditCard__${prop} ReactCreditCard__display`

  if (focused === prop) {
    className += ' ReactCreditCard--focused'
  }

  return className
}

export default ReactCreditCard
