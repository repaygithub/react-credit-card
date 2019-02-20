import * as React from 'react'
import { cleanup, render } from 'react-testing-library'
import ReactCreditCard from './Card'

afterEach(cleanup)

describe('React Credit Card', () => {
  test('should match snapshot', () => {
    const creditCard = render(<ReactCreditCard number="" />)
    expect(creditCard.asFragment()).toMatchSnapshot()
  })

  test('should render number', () => {
    const creditCard = render(<ReactCreditCard number="5105105105105100" />)
    expect(creditCard.getByText('5105105105105100')).not.toBeNull()
  })

  test('should show back when focused = cvc', () => {
    let creditCard = render(<ReactCreditCard number="" focused="cvc" />)
    expect(creditCard.container.firstChild.firstChild).toHaveClass('ReactCreditCard--flipped')
    creditCard = render(<ReactCreditCard number="" focused="number" />)
    expect(creditCard.container.firstChild.firstChild).not.toHaveClass('ReactCreditCard--flipped')
  })
})
