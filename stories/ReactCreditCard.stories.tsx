import '../src/ReactCreditCard.css'

import { boolean, select, text } from '@storybook/addon-knobs'
import * as React from 'react'

import ReactCreditCard, { FOCUS_TYPE } from '../src/ReactCreditCard'

const focusTypes: FOCUS_TYPE[] = ['number', 'cvc', 'expiration', 'name']
const brandTypes = ['amex', 'mastercard', 'visa', 'discover', 'unknown']
const exampleBrandNumbers = {
  Visa: '4111111111111111',
  'American Express': '378282246310005',
  Discover: '6011111111111117',
  Mastercard: '5105105105105100',
}

const Note = ({ children }) => <div style={{ padding: '20px' }}>{children}</div>

export default {
  title: 'react-credit-card',
  component: ReactCreditCard,
}

export const StandardUsage = (): React.ReactElement => (
  <ReactCreditCard
    number={text('number', '4111111111111111')}
    name={text('name', 'CS Human')}
    focused={select<FOCUS_TYPE>('focused', focusTypes, 'number')}
    expiration={text('expiration', '01/27')}
    cvc={text('cvc', '')}
    hasRadialGradient={boolean('useRadialGradient', false)}
    hasShadow={boolean('hasShadow', false)}
  />
)

export const BuiltIn = (): React.ReactElement => (
  <>
    <ReactCreditCard
      number={select('built-in brands', exampleBrandNumbers, exampleBrandNumbers.Visa)}
      name={text('name', 'CS Human')}
      focused={select<FOCUS_TYPE>('focused', focusTypes, 'number')}
      expiration={text('expiration', '')}
    />
    <Note>*Note American Express does not flip when CVC is focused like other brands.</Note>
  </>
)
BuiltIn.storyName = 'view built-in card brands'

export const CustomNamePlaceholder = (): React.ReactElement => (
  <ReactCreditCard
    number={text('number', '')}
    name={text('name', '')}
    placeholderName={text('placeholderName', 'Person One')}
    focused={select<FOCUS_TYPE>('focused', focusTypes, 'number')}
    expiration={text('expiration', '')}
  />
)

export const OverridBrandWithTypeProp = (): React.ReactElement => (
  <ReactCreditCard
    number={text('number', '4111111111111111')}
    name={text('name', '')}
    type={select('type', brandTypes, 'amex')}
    focused={select('focused', focusTypes, 'name')}
    expiration={text('expiration', '01/27')}
  />
)
