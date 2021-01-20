import React from 'react'

import ReactCreditCard, { FOCUS_TYPE } from '../src/ReactCreditCard'

const styles: React.CSSProperties = {
  padding: '40px',
  margin: '40px',
  display: 'flex',
  flexDirection: 'column',
}

export default {
  title: 'TypeScript Usage Example',
  component: ReactCreditCard,
  parameters: {
    knobs: { disabled: true },
  },
}

export const AsAForm = (): React.ReactElement => {
  const [values, setValues] = React.useState({
    name: '',
    number: '4111111111111111',
    expiration: '',
    cvc: '',
  })
  const handleChange = React.useCallback(
    (event) => {
      const { name, value } = event.target
      setValues((v) => ({ ...v, [name]: value }))
    },
    [setValues]
  )

  const [focused, setFocus] = React.useState<FOCUS_TYPE | undefined>(undefined)
  const handleFocus = React.useCallback((event) => setFocus(event.target.name as FOCUS_TYPE), [
    setFocus,
  ])
  const handleBlur = React.useCallback(() => setFocus(undefined), [setFocus])

  return (
    <form>
      <div style={styles}>
        <fieldset>
          <label>Name on card</label>
          <input
            name="name"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.name}
          />
        </fieldset>
        <fieldset>
          <label>Card Number</label>
          <input
            name="number"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.number}
          />
        </fieldset>
        <fieldset>
          <label>Expiration</label>
          <input
            name="expiration"
            placeholder="MM/YY"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.expiration}
          />
        </fieldset>
        <fieldset style={{ marginBottom: '20px' }}>
          <label>CVC</label>
          <input
            name="cvc"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={values.cvc}
          />
        </fieldset>
        <ReactCreditCard {...values} focused={focused} />
      </div>
    </form>
  )
}
