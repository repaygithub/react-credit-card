import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs/react'
import ReactCreditCard from '../src/Card'
import '../src/Card.css'

const focusTypes = ['number', 'cvc', 'expiration']

storiesOf('react-credit-card', module)
  .add('basic display', () => (
    <ReactCreditCard number={text('number', '')} focused={select('focused', focusTypes)} />
  ))