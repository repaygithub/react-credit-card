import * as React from 'react'
import { cleanup, render } from 'react-testing-library'
import ReactCreditCard from './Card'

afterEach(cleanup)

describe('React Credit Card', () => {
  test('should match snapshot', () => {
    const creditCard = render(<ReactCreditCard />)
    expect(creditCard.asFragment()).toMatchSnapshot()
  })

  test('should match amex snapshot', () => {
    const creditCard = render(<ReactCreditCard number="340000000000009" />)
    expect(creditCard.asFragment()).toMatchSnapshot()
  })

  test('should render number', () => {
    const creditCard = render(<ReactCreditCard number="5105105105105100" />)
    expect(creditCard.getByText('5105 1051 0510 5100')).not.toBeNull()
  })

  test('should show back when focused = cvc', () => {
    let creditCard = render(<ReactCreditCard focused="cvc" />)
    expect(creditCard.container.firstChild.firstChild).toHaveClass('ReactCreditCard--flipped')
    creditCard.rerender(<ReactCreditCard focused="number" />)
    expect(creditCard.container.firstChild.firstChild).not.toHaveClass('ReactCreditCard--flipped')
  })

  test('should allow custom placeholderName', () => {
    let creditCard = render(<ReactCreditCard placeholderName="" />)
    expect(() => creditCard.getByText('FULL NAME')).toThrow()
    creditCard.rerender(<ReactCreditCard placeholderName="CS Human" />)
    expect(creditCard.getByText('CS Human')).not.toBeNull()
  })

  test('should update name', () => {
    let creditCard = render(<ReactCreditCard name="" />)
    expect(creditCard.getByText('FULL NAME')).not.toBeNull()
    creditCard.rerender(<ReactCreditCard name="Eddard Stark" />)
    expect(creditCard.getByText('Eddard Stark')).not.toBeNull()
  })

  test('should display expiration or placeholders', () => {
    let creditCard = render(<ReactCreditCard expiration="" />)
    expect(creditCard.getByText('••/••')).not.toBeNull()
    creditCard.rerender(<ReactCreditCard expiration="0" />)
    expect(creditCard.getByText('0•/••')).not.toBeNull()
    creditCard.rerender(<ReactCreditCard expiration="01/19" />)
    expect(creditCard.getByText('01/19')).not.toBeNull()
    creditCard.rerender(<ReactCreditCard expiration="01/2019" />)
    expect(creditCard.getByText('01/2019')).not.toBeNull()
  })
})
