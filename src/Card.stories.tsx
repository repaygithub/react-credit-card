import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs/react'
import ReactCreditCard from './Card'
import '../src/Card.css'

const focusTypes = ['number', 'cvc', 'expiration', 'name']
const brandTypes = ['amex', 'mastercard', 'visa', 'discover']
const exampleBrandNumbers = {
  Visa: '4111111111111111',
  'American Express': '378282246310005',
  Discover: '6011111111111117',
  Mastercard: '5105105105105100',
}

storiesOf('react-credit-card', module)
  .add('standard usage', () => (
    <ReactCreditCard
      number={text('number', '4111111111111111')}
      name={text('name', 'CS Human')}
      focused={select('focused', focusTypes)}
      expiration={text('expiration', '01/27')}
      useRadialGradient={boolean('useRadialGradient', false)}
    />
  ))
  .add('view built-in card brands', () => (
    <>
      <ReactCreditCard
        number={select('built-in brands', exampleBrandNumbers, exampleBrandNumbers.Visa)}
        name={text('name', 'CS Human')}
        focused={select('focused', focusTypes)}
        expiration={text('expiration', '')}
      />
      <Note>*Note American Express does not flip when CVC is focused like other brands.</Note>
    </>
  ))
  .add('custom name placeholder', () => (
    <ReactCreditCard
      number={text('number', '')}
      name={text('name', '')}
      placeholderName={text('placeholderName', 'Person One')}
      focused={select('focused', focusTypes)}
      expiration={text('expiration', '')}
    />
  ))
  .add('override brand with type prop', () => (
    <ReactCreditCard
      number={text('number', '4111111111111111')}
      name={text('name', '')}
      type={select('type', brandTypes, undefined)}
      focused={select('focused', focusTypes, 'name')}
      expiration={text('expiration', '01/27')}
    />
  ))

const Note = ({ children }) => <div style={{ padding: '20px' }}>{children}</div>
