import * as React from 'react'
import { formatCvc, formatExpiration, formatNumber, getCardInfo } from './helpers'
import { getLogoSrc } from './cardValidation'

export type FOCUS_TYPE = 'number' | 'cvc' | 'expiration' | 'name'

interface ReactCreditCardProps {
  number?: string
  name?: string
  expiration?: string
  expirationBefore?: string
  expirationAfter?: string
  cvc?: string
  placeholderName?: string
  type?: string
  focused?: FOCUS_TYPE
  hasRadialGradient?: boolean
  hasShadow?: boolean
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
  let isAmex = cardInfo.brand === 'amex'
  let isFlipped = props.focused === 'cvc' && !isAmex
  const topClassName = classnames(
    'ReactCreditCard',
    isFlipped && 'ReactCreditCard--flipped',
    `ReactCreditCard--${cardInfo.brand}`,
    cardInfo.brand !== 'unknown' && 'ReactCreditCard--identified',
    props.hasShadow && 'ReactCreditCard--shadow',
    props.hasRadialGradient && 'ReactCreditCard--radial'
  )
  return (
    <div className="ReactCreditCard__container">
      <div className={topClassName}>
        <div className="ReactCreditCard__front">
          <div className="ReactCreditCard__lower">
            <div className="ReactCreditCard__shiny" />
            {isAmex && (
              <div className={displayClassName('cvc', props.focused)}>
                {formatCvc(props.cvc, cardInfo.cvcLength)}
              </div>
            )}
            <img className="ReactCreditCard__logo" src={getLogoSrc(cardInfo.brand)} />
            <div className={displayClassName('number', props.focused)}>
              {formatNumber(props.number, cardInfo)}
            </div>
            <div className={displayClassName('name', props.focused)}>
              {!props.name ? props.placeholderName : props.name}
            </div>
            <div
              className={displayClassName('expiration', props.focused)}
              data-before={props.expirationBefore}
              data-after={props.expirationAfter}
            >
              {formatExpiration(props.expiration)}
            </div>
          </div>
        </div>
        <div className="ReactCreditCard__back">
          <div className="ReactCreditCard__bar" />
          {!isAmex && (
            <div className={displayClassName('cvc', props.focused)}>
              {formatCvc(props.cvc, cardInfo.cvcLength)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ReactCreditCard.defaultProps = {
  placeholderName: 'FULL NAME',
  expirationBefore: 'month/year',
  expirationAfter: 'valid\nthru',
}

function displayClassName(prop: FOCUS_TYPE, focused: FOCUS_TYPE | undefined): string {
  let className = `ReactCreditCard__${prop} ReactCreditCard__display`

  if (focused === prop) {
    className += ' ReactCreditCard--focused'
  }

  return className
}

export default ReactCreditCard
