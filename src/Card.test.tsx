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

  describe('type prop', () => {
    test('type prop should override number', () => {
      const creditCard = render(<ReactCreditCard number="340000000000009" type="visa" />)
      let fragment = creditCard.asFragment()
      expect(fragment.querySelector('.ReactCreditCard--visa')).not.toBeNull()
    })

    test('should handle unknown type', () => {
      const creditCard = render(<ReactCreditCard number="340000000000009" type="bazoooooka" />)
      let fragment = creditCard.asFragment()
      expect(fragment.querySelector('.ReactCreditCard--unknown')).not.toBeNull()
    })
  })

  test('adds radial pattern when hasRadialGradient = true', () => {
    const creditCard = render(<ReactCreditCard number="340000000000009" hasRadialGradient />)
    expect(creditCard.container.firstChild.firstChild).toHaveClass('ReactCreditCard--radial')
  })

  test('adds shadow when hasShadow = true', () => {
    const creditCard = render(<ReactCreditCard number="340000000000009" hasShadow />)
    expect(creditCard.container.firstChild.firstChild).toHaveClass('ReactCreditCard--shadow')
  })

  describe('number prop', () => {
    test('should render formatted number', () => {
      const creditCard = render(<ReactCreditCard number="5105105105105100" />)
      expect(creditCard.getByText('5105 1051 0510 5100')).not.toBeNull()
    })

    test('should fill to minimum number length', () => {
      const creditCard = render(<ReactCreditCard number="5105105105105" />)
      expect(creditCard.getByText('5105 1051 0510 5•••')).not.toBeNull()
    })

    test('should limit number to max length', () => {
      const creditCard = render(<ReactCreditCard number="60110000000000000000000" />)
      expect(creditCard.getByText('6011 0000 0000 0000 000')).not.toBeNull()
    })
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

  describe('expiration prop', () => {
    test('should display placeholders when not provided', () => {
      let creditCard = render(<ReactCreditCard expiration="" />)
      expect(creditCard.getByText('••/••')).not.toBeNull()
    })

    test('should handle invalid expiration input', () => {
      let creditCard = render(<ReactCreditCard expiration="//" />)
      expect(creditCard.getByText('••/••')).not.toBeNull()
    })

    test('should render when provided', () => {
      let creditCard = render(<ReactCreditCard expiration="0" />)
      expect(creditCard.getByText('0•/••')).not.toBeNull()
      creditCard.rerender(<ReactCreditCard expiration="01/19" />)
      expect(creditCard.getByText('01/19')).not.toBeNull()
      creditCard.rerender(<ReactCreditCard expiration="01/2019" />)
      expect(creditCard.getByText('01/2019')).not.toBeNull()
    })
  })

  test('renders expirationBefore default', () => {
    let creditCard = render(<ReactCreditCard expiration="0" />)
    let expirationNode = creditCard.asFragment().querySelector('.ReactCreditCard__expiration')
    expect(expirationNode.getAttribute('data-before')).toEqual('month/year')
  })

  test('renders expirationAfter default', () => {
    let creditCard = render(<ReactCreditCard expiration="0" />)
    let expirationNode = creditCard.asFragment().querySelector('.ReactCreditCard__expiration')
    expect(expirationNode.getAttribute('data-after')).toEqual('valid thru')
  })

  describe('cvc prop', () => {
    describe('when brand is not amex', () => {
      test('placeholders on the back when not provided', () => {
        let creditCard = render(<ReactCreditCard number="5105105105105100" />)
        let fragment = creditCard.asFragment()
        expect(fragment.querySelector('.ReactCreditCard__back')).toHaveTextContent('•••')
      })

      test('placeholders on the back to fill partial cvc', () => {
        let creditCard = render(<ReactCreditCard number="5105105105105100" cvc="12" />)
        let fragment = creditCard.asFragment()
        expect(fragment.querySelector('.ReactCreditCard__back')).toHaveTextContent('12•')
      })

      test('is displayed on the back', () => {
        let creditCard = render(<ReactCreditCard number="5105105105105100" cvc="123" />)
        let fragment = creditCard.asFragment()
        expect(fragment.querySelector('.ReactCreditCard__back')).toHaveTextContent('123')
      })
    })

    describe('when brand is amex', () => {
      test('placeholders on the front when not provided', () => {
        let creditCard = render(<ReactCreditCard number="340000000000009" />)
        let fragment = creditCard.asFragment()
        expect(fragment.querySelector('.ReactCreditCard__front')).toHaveTextContent('••••')
      })

      test('is displayed on the front', () => {
        let creditCard = render(<ReactCreditCard number="340000000000009" cvc="1234" />)
        let fragment = creditCard.asFragment()
        expect(fragment.querySelector('.ReactCreditCard__front')).toHaveTextContent('1234')
      })
    })
  })

  test('should display cvc or placeholders', () => {
    let creditCard = render(<ReactCreditCard number="5105105105105100" />)
    expect(creditCard.getByText('•••')).not.toBeNull()
    creditCard.rerender(<ReactCreditCard number="5105105105105100" cvc="12" />)
    expect(creditCard.getByText('12•')).not.toBeNull()
    let fragment = creditCard.asFragment()
    expect(fragment.querySelector('.ReactCreditCard__back')).toHaveTextContent('12•')
  })
})
