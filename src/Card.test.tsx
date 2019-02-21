import * as React from 'react'
import { cleanup, render } from 'react-testing-library'
import ReactCreditCard from './Card'

afterEach(cleanup)

describe('React Credit Card', () => {
  test('should match snapshot', () => {
    const creditCard = render(<ReactCreditCard number="" name="" placeholderName="FULL NAME" />)
    expect(creditCard.asFragment()).toMatchSnapshot()
  })

  test('should match amex snapshot', () => {
    const creditCard = render(
      <ReactCreditCard number="340000000000009" name="" placeholderName="FULL NAME" />
    )
    expect(creditCard.asFragment()).toMatchSnapshot()
  })

  test('should render number', () => {
    const creditCard = render(
      <ReactCreditCard number="5105105105105100" name="" placeholderName="FULL NAME" />
    )
    expect(creditCard.getByText('5105 1051 0510 5100')).not.toBeNull()
  })

  test('should show back when focused = cvc', () => {
    let creditCard = render(
      <ReactCreditCard number="" focused="cvc" name="" placeholderName="FULL NAME" />
    )
    expect(creditCard.container.firstChild.firstChild).toHaveClass('ReactCreditCard--flipped')
    creditCard = render(
      <ReactCreditCard number="" focused="number" name="" placeholderName="FULL NAME" />
    )
    expect(creditCard.container.firstChild.firstChild).not.toHaveClass('ReactCreditCard--flipped')
  })

  test('should update name', () => {
    let creditCard = render(<ReactCreditCard number="" name="" placeholderName="FULL NAME" />)
    expect(creditCard.getByText('FULL NAME')).not.toBeNull()
    creditCard = render(
      <ReactCreditCard number="" name="Eddard Stark" placeholderName="FULL NAME" />
    )
    expect(creditCard.getByText('Eddard Stark')).not.toBeNull()
  })
})
